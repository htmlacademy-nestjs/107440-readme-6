import { Injectable } from '@nestjs/common';
import { EntityFactory, PostPhoto } from '@project/core';
import { PostPhotoEntity } from '../entities/post.photo.entity';

@Injectable()
export class PostPhotoFactory implements EntityFactory<PostPhotoEntity> {
  public create(entityPlainData: PostPhoto): PostPhotoEntity {
    return new PostPhotoEntity(entityPlainData);
  }
}
