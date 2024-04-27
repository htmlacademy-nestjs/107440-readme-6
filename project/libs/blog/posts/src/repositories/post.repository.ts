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
    const record = await this.client.post.create({
      data: {
        ...entity.toPOJO(),
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
    const foundRecord = (await this.client.post.findUnique({
      where: {
        id,
      },
    })) as BlogPost;

    if (!foundRecord) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(foundRecord);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }
}
