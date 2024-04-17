import { Injectable } from '@nestjs/common';
import { EntityFactory, PostVideo } from '@project/core';
import { PostVideoEntity } from '../entities/post.video.entity';

@Injectable()
export class PostVideoFactory implements EntityFactory<PostVideoEntity> {
  public create(entityPlainData: PostVideo): PostVideoEntity {
    return new PostVideoEntity(entityPlainData);
  }
}
