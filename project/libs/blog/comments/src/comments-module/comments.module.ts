import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaClientService } from '@project/blog-models';

@Module({
  imports: [PrismaClientService],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
