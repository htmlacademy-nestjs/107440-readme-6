import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';

import { PostFieldsRelationFactory } from '../factories/post-fields.relation.factory';
import { PostFieldsRelationEntity } from '../entities';

@Injectable()
export class PostFieldsRelationsRepository extends BaseMemoryRepository<PostFieldsRelationEntity> {
  constructor(entityFactory: PostFieldsRelationFactory) {
    super(entityFactory);
  }
}
