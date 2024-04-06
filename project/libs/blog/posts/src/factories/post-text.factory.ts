import { Injectable } from '@nestjs/common';
import { PostText, EntityFactory } from '@project/core';
import { PostTextEntity } from '../entities/post.text.entity';

@Injectable()
export class PostTextFactory implements EntityFactory<PostTextEntity> {
  public create(entityPlainData: PostText): PostTextEntity {
    return new PostTextEntity(entityPlainData);
  }
}
