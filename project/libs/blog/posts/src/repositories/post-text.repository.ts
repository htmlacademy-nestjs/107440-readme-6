import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/blog-models';

import { PostTextEntity } from '../entities';
import { PostTextFactory } from '../factories';

@Injectable()
export class PostTextRepository extends BasePostgresRepository<PostTextEntity> {
  constructor(
    entityFactory: PostTextFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: PostTextEntity): Promise<void> {
    const record = await this.client.textPost.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }
}
