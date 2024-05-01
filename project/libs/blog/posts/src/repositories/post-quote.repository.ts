import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';

import { PostQuoteFactory } from '../factories/post-quote.factory';
import { PostQuoteEntity } from '../entities/post.quote.entity';
import { PrismaClientService } from '@project/blog-models';

@Injectable()
export class PostQuoteRepository extends BasePostgresRepository<PostQuoteEntity> {
  constructor(
    entityFactory: PostQuoteFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: PostQuoteEntity): Promise<void> {
    const record = await this.client.quotePost.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }
}
