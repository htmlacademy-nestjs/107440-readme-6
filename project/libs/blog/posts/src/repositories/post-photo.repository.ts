import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';

import { PostPhotoFactory } from '../factories/post-photo.factory';
import { PostPhotoEntity } from '../entities/post.photo.entity';

@Injectable()
export class PostPhotoRepository extends BaseMemoryRepository<PostPhotoEntity> {
  constructor(entityFactory: PostPhotoFactory) {
    super(entityFactory);
  }
}
