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
import { ApiResponse } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';

import { CommentsResponseMessage } from './comments.constant';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentRdo } from '../rdo/comment.rdo';

@Controller('posts/:postId/comments')
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
  @Get('/')
  public async getComments(
    @Param('postId') postId: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    const comments = await this.commentsService.getComments(postId);
    return fillDto(
      CommentRdo,
      comments.map((comment) => comment.toPOJO())
    );
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CommentsResponseMessage.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsResponseMessage.PostNotFound,
  })
  @Post('/')
  public async createComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.commentsService.createComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
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
