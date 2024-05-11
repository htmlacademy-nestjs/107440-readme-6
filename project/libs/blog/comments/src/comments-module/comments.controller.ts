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
import { CommentsQuery } from './comments.query';

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
  @Get()
  public async getComments(
    @Param('postId') postId: string,
    @Query() query?: CommentsQuery
  ) {
    const comments = await this.commentsService.getComments(postId, query);

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
  @Post()
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
  @Delete('/:commentId/users/:userId')
  public async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Param('userId') userId: string
  ) {
    await this.commentsService.checkCommentByUserId(commentId, userId);
    await this.commentsService.checkCommentByPostId(commentId, postId);

    await this.commentsService.deleteComment(commentId);
  }
}
