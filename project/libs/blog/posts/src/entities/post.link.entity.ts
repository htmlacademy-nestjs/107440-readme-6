import { StorableEntity, PostLink } from '@project/core';
import { PostTypeRelationEntity } from './post-type.relation.entity';

export class PostLinkEntity
  extends PostTypeRelationEntity
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

    this.id = post.id ?? undefined;
    this.link = post.link;
    this.description = post.description;
    this.postId = post.postId ?? undefined;
  }

  public toPOJO(): PostLink {
    return {
      id: this.id,
      link: this.link,
      description: this.description,
      postId: this.postId,
    };
  }
}
