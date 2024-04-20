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
}
