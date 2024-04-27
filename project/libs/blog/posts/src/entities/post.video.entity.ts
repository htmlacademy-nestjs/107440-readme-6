import { StorableEntity, PostVideo } from '@project/core';
import { PostTypeRelationEntity } from './post-type.relation.entity';

export class PostVideoEntity
  extends PostTypeRelationEntity
  implements StorableEntity<PostVideo>
{
  public title: string;
  public videoUrl: string;

  constructor(post?: PostVideo) {
    super();
    this.populate(post);
  }

  public populate(post?: PostVideo): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.title = post.title;
    this.videoUrl = post.videoUrl;
    this.postId = post.postId ?? undefined;
  }

  public toPOJO(): PostVideo {
    return {
      id: this.id,
      title: this.title,
      videoUrl: this.videoUrl,
      postId: this.postId,
    };
  }
}
