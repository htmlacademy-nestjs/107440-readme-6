import { Entity, Comment, StorableEntity } from '@project/core';

export class CommentEntity extends Entity implements StorableEntity<Comment> {
  public createdAt: Date;
  public updatedAt: Date;
  public text: string;
  public postId: string;
  public userId: string;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment): void {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? '';
    this.postId = comment.postId;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
