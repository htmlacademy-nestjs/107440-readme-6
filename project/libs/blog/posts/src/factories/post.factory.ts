import { Injectable } from '@nestjs/common';
import { BlogPost, EntityFactory } from '@project/core';
import { BlogPostEntity } from '../entities';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: BlogPost): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }
}
