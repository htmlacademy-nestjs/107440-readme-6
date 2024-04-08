import { Injectable } from '@nestjs/common';
import { EntityFactory, PostQuote } from '@project/core';
import { PostQuoteEntity } from '../entities/post.quote.entity';

@Injectable()
export class PostQuoteFactory implements EntityFactory<PostQuoteEntity> {
  public create(entityPlainData: PostQuote): PostQuoteEntity {
    return new PostQuoteEntity(entityPlainData);
  }
}
