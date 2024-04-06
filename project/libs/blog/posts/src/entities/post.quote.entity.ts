import { StorableEntity, PostType, PostState, PostQuote } from '@project/core';

import { PostEntity } from './post.entity';

export class PostQuoteEntity
  extends PostEntity
  implements StorableEntity<PostQuote>
{
  public text: string;
  public author: string;

  constructor(post?: PostQuote) {
    super();
    this.populate(post);
  }

  public populate(post?: PostQuote): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.text = post.text;
    this.author = post.author;
    this.state = PostState.Draft;
    this.type = PostType.Text;

    this.createdDate = '';
    this.publishedDate = '';
  }

  public toPOJO(): PostQuote {
    return {
      id: this.id,
      author: this.author,
      text: this.text,
      state: this.state as PostState,
      type: this.type as PostType,
      createdDate: this.createdDate,
      publishedDate: this.publishedDate,
    };
  }
}
