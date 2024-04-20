import { Module } from '@nestjs/common';

import { BlogPostController } from './posts.controller';
import { BlogPostService } from './posts.service';
import { BlogPostRepository } from '../repositories';
import { BlogPostFactory, PostTypesFactory } from '../factories';

@Module({
  imports: [],
  controllers: [BlogPostController],
  providers: [
    BlogPostService,
    BlogPostRepository,
    BlogPostFactory,
    PostTypesFactory,
  ],
})
export class PostsModule {}
