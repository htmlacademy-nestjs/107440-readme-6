import { Controller, Post, Delete, Param, Query, Get } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  @Get('/post/:postId')
  gestComments(
    @Param('postId') postId: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    // Implementation
  }

  @Post('/post/:postId')
  createComment(@Param('postId') postId: string) {
    // Implementation
  }

  @Delete('/:commentId/post/:postId')
  deleteComment(
    @Param('postId') commentId: string,
    @Param('postId') postId: string
  ) {
    // Implementation
  }
}
