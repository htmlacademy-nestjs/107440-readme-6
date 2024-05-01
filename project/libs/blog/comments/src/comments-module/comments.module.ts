import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { CommentFactory } from './comments.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, CommentFactory],
  exports: [CommentsRepository, CommentFactory],
})
export class CommentsModule {}
