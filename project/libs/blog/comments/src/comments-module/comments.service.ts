import {
  ConflictException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { COMMENT_RECORD_NOT_FOUND } from './comments.constant';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentEntity } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}
  public async createComment(
    postId: string,
    dto: CreateCommentDto
  ): Promise<CommentEntity> {
    throw new NotImplementedException();
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
