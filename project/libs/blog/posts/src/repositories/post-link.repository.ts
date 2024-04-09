import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';

import { PostLinkFactory } from '../factories/post-link.factory';
import { PostLinkEntity } from '../entities/post.link.entity';

@Injectable()
export class PostLinkRepository extends BaseMemoryRepository<PostLinkEntity> {
  constructor(entityFactory: PostLinkFactory) {
    super(entityFactory);
  }
}
