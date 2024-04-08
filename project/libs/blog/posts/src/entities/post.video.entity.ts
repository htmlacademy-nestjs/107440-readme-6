import { StorableEntity, PostType, PostState, PostVideo } from '@project/core';

import { PostEntity } from './post.entity';

export class PostVideoEntity
  extends PostEntity
  implements StorableEntity<PostVideo>
{
  public name: string;
  public linkToVideo: string;

  constructor(post?: PostVideo) {
    super();
    this.populate(post);
  }

  public populate(post?: PostVideo): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.name = post.name;
    this.linkToVideo = post.linkToVideo;
    this.state = PostState.Draft;
    this.type = PostType.Text;

    this.createdDate = '';
    this.publishedDate = '';
  }

  public toPOJO(): PostVideo {
    return {
      id: this.id,
      name: this.name,
      linkToVideo: this.linkToVideo,
      state: this.state as PostState,
      type: this.type as PostType,
      createdDate: this.createdDate,
      publishedDate: this.publishedDate,
    };
  }
}
