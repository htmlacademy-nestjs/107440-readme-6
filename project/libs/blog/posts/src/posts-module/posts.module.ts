import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';
import { CommentsModule } from '@project/comments';

import { BlogPostController } from './posts.controller';
import { BlogPostService } from './posts.service';
import {
  BlogPostRepository,
  PostLinkRepository,
  PostPhotoRepository,
  PostQuoteRepository,
  PostTextRepository,
  PostTypesRepository,
  PostVideoRepository,
} from '../repositories';
import {
  BlogPostFactory,
  PostLinkFactory,
  PostPhotoFactory,
  PostQuoteFactory,
  PostTextFactory,
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
    PostLinkFactory,
    PostLinkRepository,
    PostQuoteFactory,
    PostQuoteRepository,
    PostTextFactory,
    PostTextRepository,
  ],
})
export class PostsModule {}
