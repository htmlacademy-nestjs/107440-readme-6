import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { BlogPostFactory } from '../factories';
import { BlogPostEntity } from '../entities';

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {
  constructor(entityFactory: BlogPostFactory) {
    super(entityFactory);
  }
}
