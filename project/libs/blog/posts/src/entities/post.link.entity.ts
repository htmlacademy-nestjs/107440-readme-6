import { StorableEntity, PostLink, Entity } from '@project/core';

export class PostLinkEntity extends Entity implements StorableEntity<PostLink> {
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
  }

  public toPOJO(): PostLink {
    return {
      id: this.id,
      link: this.link,
      description: this.description,
    };
  }
}
