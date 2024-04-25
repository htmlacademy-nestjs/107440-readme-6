import {
  BlogPost,
  Entity,
  PostStateEnum,
  PostTypeEnum,
  StorableEntity,
} from '@project/core';

export class BlogPostEntity extends Entity implements StorableEntity<BlogPost> {
  public createdAt?: Date;
  public updatedAt?: Date;
  public userId: string;
  public state?: PostStateEnum;
  public type: PostTypeEnum;

  constructor(post?: BlogPost) {
    super();
    this.populate(post);
  }

  public populate(post?: BlogPost): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.userId = post.userId;
    this.state = post.state ?? undefined;
    this.createdAt = post.createdAt ?? undefined;
    this.updatedAt = post.updatedAt ?? undefined;
    this.type = post.type;
    this.state = post.state ?? PostStateEnum.Published;
  }

  public toPOJO(): BlogPost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      state: this.state,
      userId: this.userId,
      type: this.type,
    };
  }
}
