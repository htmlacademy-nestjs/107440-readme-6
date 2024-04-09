import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';

import { PostQuoteFactory } from '../factories/post-quote.factory';
import { PostQuoteEntity } from '../entities/post.quote.entity';

@Injectable()
export class PostQuoteRepository extends BaseMemoryRepository<PostQuoteEntity> {
  constructor(entityFactory: PostQuoteFactory) {
    super(entityFactory);
  }
}
