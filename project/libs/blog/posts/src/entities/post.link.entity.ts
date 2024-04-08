import { StorableEntity, PostType, PostState, PostLink } from '@project/core';

import { PostEntity } from './post.entity';

export class PostLinkEntity
  extends PostEntity
  implements StorableEntity<PostLink>
{
  public link: string;
  public description: string;

  constructor(post?: PostLink) {
    super();
    this.populate(post);
  }

  public populate(post?: PostLink): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.link = post.link;
    this.description = post.description;
    this.state = PostState.Draft;
    this.type = PostType.Text;

    this.createdDate = '';
    this.publishedDate = '';
  }

  public toPOJO(): PostLink {
    return {
      id: this.id,
      link: this.link,
      description: this.description,
      state: this.state as PostState,
      type: this.type as PostType,
      createdDate: this.createdDate,
      publishedDate: this.publishedDate,
    };
  }
}
