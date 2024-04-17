import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  public createComment(postId: string) {
    // Implementation
  }
  public getComments(postId: string) {
    // Implementation
  }

  public removeComment(commentId: string, postId: string) {
    // Implementation
  }

  public removeAllComments(postId: string) {
    // Implementation
  }
}
