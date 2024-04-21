import { StorableEntity, PostPhoto } from '@project/core';
import { PostTypeRelationEntity } from './post-type.relation.entity';

export class PostPhotoEntity
  extends PostTypeRelationEntity
  implements StorableEntity<PostPhoto>
{
  public photo: string;

  constructor(post?: PostPhoto) {
    super();
    this.populate(post);
  }

  public populate(post?: PostPhoto): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.photo = post.photo;
    this.postId = post.postId ?? '';
  }

  public toPOJO(): PostPhoto {
    return {
      id: this.id,
      photo: this.photo,
      postId: this.postId,
    };
  }
}
