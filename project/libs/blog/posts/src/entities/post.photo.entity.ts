import { StorableEntity, PostPhoto, Entity } from '@project/core';

export class PostPhotoEntity
  extends Entity
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
  }

  public toPOJO(): PostPhoto {
    return {
      id: this.id,
      photo: this.photo,
    };
  }
}
