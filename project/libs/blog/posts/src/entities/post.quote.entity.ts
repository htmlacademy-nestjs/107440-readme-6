import { StorableEntity, PostQuote } from '@project/core';
import { PostTypeRelationEntity } from './post-type.relation.entity';

export class PostQuoteEntity
  extends PostTypeRelationEntity
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
    this.postId = post.postId ?? '';
  }

  public toPOJO(): PostQuote {
    return {
      id: this.id,
      author: this.author,
      text: this.text,
      postId: this.postId,
    };
  }
}
