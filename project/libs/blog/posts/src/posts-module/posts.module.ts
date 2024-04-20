import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';

import { BlogPostController } from './posts.controller';
import { BlogPostService } from './posts.service';
import { BlogPostRepository } from '../repositories';
import { BlogPostFactory, PostTypesFactory } from '../factories';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogPostController],
  providers: [
    BlogPostService,
    BlogPostRepository,
    BlogPostFactory,
    PostTypesFactory,
  ],
})
export class PostsModule {}
