import { StorableEntity, PostText } from '@project/core';
import { PostTypeRelationEntity } from './post-type.relation.entity';

export class PostTextEntity
  extends PostTypeRelationEntity
  implements StorableEntity<PostText>
{
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
    this.postId = post.postId ?? '';
  }

  public toPOJO(): PostText {
    return {
      id: this.id,
      name: this.name,
      announcement: this.announcement,
      text: this.text,
      postId: this.postId,
    };
  }
}
