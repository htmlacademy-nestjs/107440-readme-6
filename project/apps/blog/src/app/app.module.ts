import { Module } from '@nestjs/common';

import { PostsModule } from '@project/posts';
import { FeedModule } from '@project/feed';
import { CommentsModule } from '@project/comments';
import { BlogConfigModule } from '@project/blog-config';

@Module({
  imports: [PostsModule, FeedModule, CommentsModule, BlogConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
