import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';

import { PostLinkFactory } from '../factories/post-link.factory';
import { PostLinkEntity } from '../entities/post.link.entity';
import { PrismaClientService } from '@project/blog-models';

@Injectable()
export class PostLinkRepository extends BasePostgresRepository<PostLinkEntity> {
  constructor(
    entityFactory: PostLinkFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: PostLinkEntity): Promise<void> {
    const record = await this.client.linkPost.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }
}
