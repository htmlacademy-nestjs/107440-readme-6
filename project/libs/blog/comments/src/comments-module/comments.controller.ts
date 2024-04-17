import {
  Controller,
  Post,
  Delete,
  Param,
  Query,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CommentsResponseMessage } from './comment.constant';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentsResponseMessage.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsResponseMessage.PostNotFound,
  })
  @Get('/post/:postId')
  getComments(
    @Param('postId') postId: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    // Implementation
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CommentsResponseMessage.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsResponseMessage.PostNotFound,
  })
  @Post('/post/:postId')
  createComment(@Param('postId') postId: string) {
    // Implementation
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: CommentsResponseMessage.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsResponseMessage.PostOrCommentNotFound,
  })
  @Delete('/:commentId/post/:postId')
  deleteComment(
    @Param('postId') commentId: string,
    @Param('postId') postId: string
  ) {
    // Implementation
  }
}
