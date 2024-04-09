import { StorableEntity, PostText, Entity } from '@project/core';

export class PostTextEntity extends Entity implements StorableEntity<PostText> {
  public name: string;
  public announcement: string;
  public text: string;

  constructor(post?: PostText) {
    super();
    this.populate(post);
  }

  public populate(post?: PostText): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.name = post.name;
    this.announcement = post.announcement;
    this.text = post.text;
  }

  public toPOJO(): PostText {
    return {
      id: this.id,
      name: this.name,
      announcement: this.announcement,
      text: this.text,
    };
  }
}
