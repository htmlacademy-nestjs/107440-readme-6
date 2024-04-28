import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/blog-models';
import { BlogPost } from '@project/core';

import { BlogPostFactory } from '../factories';
import { BlogPostEntity } from '../entities';

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
}
