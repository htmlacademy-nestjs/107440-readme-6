import { StorableEntity, PostType, PostText, PostState } from '@project/core';

import { PostEntity } from './post.entity';

export class PostTextEntity
  extends PostEntity
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
    this.state = PostState.Draft;
    this.type = PostType.Text;

    this.createdDate = '';
    this.publishedDate = '';
  }

  public toPOJO(): PostText {
    return {
      id: this.id,
      name: this.name,
      announcement: this.announcement,
      text: this.text,
      state: this.state as PostState,
      type: this.type as PostType,
      createdDate: this.createdDate,
      publishedDate: this.publishedDate,
    };
  }
}
