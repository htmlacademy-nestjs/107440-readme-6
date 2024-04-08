import { Module } from '@nestjs/common';

import { PostsModule } from '@project/posts';
import { FeedModule } from '@project/feed';
import { CommentsModule } from '@project/comments';

@Module({
  imports: [PostsModule, FeedModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
