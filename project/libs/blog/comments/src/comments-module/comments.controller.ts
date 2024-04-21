import {
  Controller,
  Post,
  Delete,
  Param,
  Query,
  Get,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { CommentsResponseMessage } from './comments.constant';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
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
  public async createComment(
    @Param('postId') postId: string,
    @Body() commentDto: CreateCommentDto
  ) {
    const newComment = await this.commentsService.createComment(
      commentDto,
      postId
    );
    //return fillDto(CommentRdo, newComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: CommentsResponseMessage.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsResponseMessage.PostOrCommentNotFound,
  })
  @Delete('/:commentId')
  public async deleteComment(@Param('commentId') commentId: string) {
    await this.commentsService.deleteComment(commentId);
  }
}
