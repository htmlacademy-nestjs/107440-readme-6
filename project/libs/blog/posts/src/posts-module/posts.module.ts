import { Module } from '@nestjs/common';

import { BlogPostController } from './posts.controller';
import { BlogPostService } from './posts.service';
import {
  BlogPostRepository,
  PostFieldsRelationsRepository,
} from '../repositories';
import {
  BlogPostFactory,
  PostFieldsRelationFactory,
  PostTypesFactory,
} from '../factories';

@Module({
  imports: [],
  controllers: [BlogPostController],
  providers: [
    BlogPostService,
    BlogPostRepository,
    BlogPostFactory,
    PostTypesFactory,
    PostFieldsRelationFactory,
    PostFieldsRelationsRepository,
  ],
})
export class PostsModule {}
