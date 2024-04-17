import { StorableEntity, PostVideo, Entity } from '@project/core';

export class PostVideoEntity
  extends Entity
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

    this.name = post.name;
    this.linkToVideo = post.linkToVideo;
  }

  public toPOJO(): PostVideo {
    return {
      name: this.name,
      linkToVideo: this.linkToVideo,
    };
  }
}
