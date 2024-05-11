import { ConflictException, Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import {
  COMMENT_DELETE_POST_ERROR,
  COMMENT_DELETE_USER_ERROR,
  COMMENT_RECORD_NOT_FOUND,
} from './comments.constant';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentEntity } from './comments.entity';
import { CommentFactory } from './comments.factory';
import { CommentsQuery } from './comments.query';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  public async createComment(
    postId: string,
    dto: CreateCommentDto
  ): Promise<CommentEntity> {
    const newComment = CommentFactory.createFromCreateCommentDto(dto, postId);

    await this.commentsRepository.save(newComment);

    return newComment;
  }

  public getComments(
    postId: string,
    query?: CommentsQuery
  ): Promise<CommentEntity[]> {
    return this.commentsRepository.findByPostId(postId, query);
  }

  public async deleteComment(commentId: string) {
    const existComment = await this.commentsRepository.findById(commentId);

    if (!existComment) {
      throw new ConflictException(COMMENT_RECORD_NOT_FOUND);
    }

    await this.commentsRepository.deleteById(commentId);
  }

  public async checkCommentByUserId(commentId: string, userId: string) {
    const existComment = await this.commentsRepository.findById(commentId);

    if (!existComment) {
      throw new ConflictException(COMMENT_RECORD_NOT_FOUND);
    }

    if (existComment.userId !== userId) {
      throw new ConflictException(COMMENT_DELETE_USER_ERROR);
    }
  }

  public async checkCommentByPostId(commentId: string, postId: string) {
    const existComment = await this.commentsRepository.findById(commentId);

    if (!existComment) {
      throw new ConflictException(COMMENT_RECORD_NOT_FOUND);
    }

    if (existComment.postId !== postId) {
      throw new ConflictException(COMMENT_DELETE_POST_ERROR);
    }
  }
}
