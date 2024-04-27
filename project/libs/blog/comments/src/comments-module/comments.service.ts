import { ConflictException, Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { COMMENT_RECORD_NOT_FOUND } from './comments.constant';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentEntity } from './comments.entity';
import { CommentFactory } from './comments.factory';

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
  public getComments(postId: string): Promise<CommentEntity[]> {
    return this.commentsRepository.findByPostId(postId);
  }

  public async deleteComment(commentId: string) {
    const existComment = await this.commentsRepository.findById(commentId);

    if (!existComment) {
      throw new ConflictException(COMMENT_RECORD_NOT_FOUND);
    }

    await this.commentsRepository.deleteById(commentId);
  }
}
