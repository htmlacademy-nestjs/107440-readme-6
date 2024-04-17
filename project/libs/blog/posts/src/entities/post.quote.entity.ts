import { StorableEntity, PostQuote, Entity } from '@project/core';

export class PostQuoteEntity
  extends Entity
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
  }

  public toPOJO(): PostQuote {
    return {
      id: this.id,
      author: this.author,
      text: this.text,
    };
  }
}
