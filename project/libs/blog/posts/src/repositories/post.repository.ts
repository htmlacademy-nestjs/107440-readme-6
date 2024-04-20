import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/blog-models';

import { BlogPostFactory } from '../factories';
import { BlogPostEntity } from '../entities';
import { BlogPost } from '@project/core';

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

  public async save(entity: BlogPostEntity): Promise<void> {
    const record = await this.client.post.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const foundRecord = await this.client.post.findUnique({
      where: {
        id,
      },
    });

    // @ts-expect-error mismatch with string and enum
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
