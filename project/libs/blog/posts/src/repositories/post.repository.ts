import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/blog-models';
import {
  BlogPost,
  PaginationResult,
  PostStateEnum,
  SortBy,
} from '@project/core';

import { BlogPostFactory } from '../factories';
import { BlogPostEntity } from '../entities';
import { BlogPostQuery } from '../posts-module/posts.query';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<
  BlogPostEntity,
  BlogPost
> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();

    // this.client.post doesn't store postTypeFields in Prisma
    delete pojoEntity.postTypeFields;

    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        state: pojoEntity.state,
        comments: {
          connect: [],
        },
      },
    });

    entity.id = record.id;
    entity.createdAt = record.createdAt;
    entity.updatedAt = record.updatedAt;
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const postRecord = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        videoPost: true,
        photoPost: true,
        linkPost: true,
        quotePost: true,
        textPost: true,
        comments: true,
      },
    });

    if (!postRecord) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    const postTypeFieldsKey = `${postRecord.type}Post`;

    const {
      videoPost,
      photoPost,
      quotePost,
      linkPost,
      textPost,
      comments,
      ...rest
    } = postRecord;

    const postObj = {
      ...rest,
      comments,
      postTypeFields: postRecord[postTypeFieldsKey],
    };

    const blogPost = this.createEntityFromDocument(postObj as BlogPost);

    return blogPost;
  }

  public async findByTitle(title: string): Promise<BlogPostEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        AND: [
          { state: PostStateEnum.Published },
          {
            OR: [
              { videoPost: { title: { contains: title } } },
              { textPost: { title: { contains: title } } },
            ],
          },
        ],
      },
      include: {
        videoPost: true,
        textPost: true,
        comments: true,
      },
    });

    return records.map((record) => {
      const postTypeFieldsKey = `${record.type}Post`;

      const { videoPost, textPost, comments, ...rest } = record;

      const postObj = {
        ...rest,
        comments,
        postTypeFields: record[postTypeFieldsKey],
      };

      return this.createEntityFromDocument(postObj as BlogPost);
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public async update(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();

    const { comments, postTypeFields, ...restFields } = pojoEntity;

    const postTypeKey = `${pojoEntity.type}Post`;

    const { postId, ...restPostTypeFields } = postTypeFields;

    await this.client.post.update({
      where: { id: entity.id },
      data: {
        ...restFields,
        [postTypeKey]: {
          update: {
            ...restPostTypeFields,
          },
        },
      },
      include: {
        videoPost: true,
        photoPost: true,
        linkPost: true,
        quotePost: true,
        textPost: true,
        comments: true,
      },
    });
  }

  public async find(
    query?: BlogPostQuery,
    state?: PostStateEnum
  ): Promise<PaginationResult<BlogPostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;

    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.type) {
      where.type = query.type;
    }

    if (query?.tagName) {
      where.tags = {
        has: query.tagName,
      };
    }

    if (query?.userId) {
      where.userId = query.userId;
    }

    if (query?.sortBy) {
      switch (query.sortBy) {
        case SortBy.Likes:
          orderBy.likesCount = query.sortDirection;
          break;
        case SortBy.Comments:
          orderBy.comments = { _count: query.sortDirection };
          break;
        case SortBy.Date:
          orderBy.createdAt = query.sortDirection;
          break;
        default:
          break;
      }
    }

    if (state) {
      where.state = state;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          videoPost: true,
          photoPost: true,
          linkPost: true,
          quotePost: true,
          textPost: true,
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => {
        const postTypeFieldsKey = `${record.type}Post`;

        const {
          videoPost,
          photoPost,
          quotePost,
          linkPost,
          textPost,
          comments,
          ...rest
        } = record;

        const postObj = {
          ...rest,
          comments,
          postTypeFields: record[postTypeFieldsKey],
        };

        return this.createEntityFromDocument(postObj as BlogPost);
      }),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }
}
