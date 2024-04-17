import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';

import { PostTextEntity } from '../entities';
import { PostTextFactory } from '../factories';

@Injectable()
export class PostTextRepository extends BaseMemoryRepository<PostTextEntity> {
  constructor(entityFactory: PostTextFactory) {
    super(entityFactory);
  }
}
