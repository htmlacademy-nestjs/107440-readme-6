import { Injectable } from '@nestjs/common';
import { EntityFactory, PostFieldsRelation } from '@project/core';
import { PostFieldsRelationEntity } from '../entities';

@Injectable()
export class PostFieldsRelationFactory
  implements EntityFactory<PostFieldsRelationEntity>
{
  public create(entityPlainData: PostFieldsRelation): PostFieldsRelationEntity {
    return new PostFieldsRelationEntity(entityPlainData);
  }
}
