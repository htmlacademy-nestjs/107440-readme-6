import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';

import { PostVideoFactory } from '../factories/post-video.factory';
import { PostVideoEntity } from '../entities/post.video.entity';

@Injectable()
export class PostVideoRepository extends BaseMemoryRepository<PostVideoEntity> {
  constructor(entityFactory: PostVideoFactory) {
    super(entityFactory);
  }
}
