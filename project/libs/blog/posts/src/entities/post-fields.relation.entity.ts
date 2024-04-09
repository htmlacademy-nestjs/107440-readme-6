import { Entity, PostFieldsRelation, PostTypeEnum } from '@project/core';

export class PostFieldsRelationEntity extends Entity {
  private postId: string;
  private type: PostTypeEnum;
  private postFieldsId: string;

  constructor(postFieldsRelation: PostFieldsRelation) {
    super();
    this.populate(postFieldsRelation);
  }

  public populate(post?: PostFieldsRelation): void {
    if (!post) {
      return;
    }

    this.postId = post.postId ?? '';
    this.type = post.type;
    this.postFieldsId = post.postFieldsId;
  }

  public toPOJO(): PostFieldsRelation {
    return {
      postId: this.postId,
      type: this.type,
      postFieldsId: this.postFieldsId,
    };
  }
}
