import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';
import { CommentsModule } from '@project/comments';

import { BlogPostController } from './posts.controller';
import { BlogPostService } from './posts.service';
import {
  BlogPostRepository,
  PostPhotoRepository,
  PostTypesRepository,
  PostVideoRepository,
} from '../repositories';
import {
  BlogPostFactory,
  PostPhotoFactory,
  PostTypesFactory,
  PostVideoFactory,
} from '../factories';

@Module({
  imports: [PrismaClientModule, CommentsModule],
  controllers: [BlogPostController],
  providers: [
    BlogPostService,
    BlogPostRepository,
    BlogPostFactory,
    PostTypesFactory,
    PostTypesRepository,
    PostVideoFactory,
    PostVideoRepository,
    PostPhotoFactory,
    PostPhotoRepository,
  ],
})
export class PostsModule {}
