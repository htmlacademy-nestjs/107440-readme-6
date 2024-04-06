import { Injectable } from '@nestjs/common';
import { EntityFactory, PostLink } from '@project/core';
import { PostLinkEntity } from '../entities/post.link.entity';

@Injectable()
export class PostLinkFactory implements EntityFactory<PostLinkEntity> {
  public create(entityPlainData: PostLink): PostLinkEntity {
    return new PostLinkEntity(entityPlainData);
  }
}
