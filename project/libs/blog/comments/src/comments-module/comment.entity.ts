import { Entity, Comment, StorableEntity } from '@project/core';

export class CommentEntity extends Entity implements StorableEntity<Comment> {
  public createdDate: string;
  public text: string;
  public postId: string;

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
    this.createdDate = comment.createdDate;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      postId: this.postId,
      text: this.text,
      createdDate: this.createdDate,
    };
  }
}
