import { Entity, Comment, StorableEntity } from '@project/core';

export class CommentEntity extends Entity implements StorableEntity<Comment> {
  public createdAt?: Date;
  public updatedAt?: Date;
  public message: string;
  public postId?: string;
  public userId: string;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment): void {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.postId = comment.postId ?? undefined;
    this.message = comment.message;
    this.createdAt = comment.createdAt ?? undefined;
    this.updatedAt = comment.updatedAt ?? undefined;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      message: this.message,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
