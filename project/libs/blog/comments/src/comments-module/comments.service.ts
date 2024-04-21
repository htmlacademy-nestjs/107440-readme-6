import { ConflictException, Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { COMMENT_RECORD_NOT_FOUND } from './comments.constant';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}
  public async createComment(dto: CreateCommentDto, postId: string) {
    // Implementation
  }
  public getComments(postId: string) {
    // Implementation
  }

  public async deleteComment(commentId: string) {
    const existComment = await this.commentsRepository.findById(commentId);

    if (!existComment) {
      throw new ConflictException(COMMENT_RECORD_NOT_FOUND);
    }

    await this.commentsRepository.deleteById(commentId);
  }

  public deleteAllComments(postId: string) {
    // Implementation
  }
}
