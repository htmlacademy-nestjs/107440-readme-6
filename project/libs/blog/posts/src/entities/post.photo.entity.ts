import { StorableEntity, PostType, PostState, PostPhoto } from '@project/core';

import { PostEntity } from './post.entity';

export class PostPhotoEntity
  extends PostEntity
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
    this.state = PostState.Draft;
    this.type = PostType.Text;

    this.createdDate = '';
    this.publishedDate = '';
  }

  public toPOJO(): PostPhoto {
    return {
      id: this.id,
      photo: this.photo,
      state: this.state as PostState,
      type: this.type as PostType,
      createdDate: this.createdDate,
      publishedDate: this.publishedDate,
    };
  }
}
