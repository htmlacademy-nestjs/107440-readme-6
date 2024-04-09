import { BlogPost, Entity, PostStateEnum, StorableEntity } from '@project/core';

export class BlogPostEntity extends Entity implements StorableEntity<BlogPost> {
  public createdAt: string;
  public publishedAt: string;
  public description: string;
  public authorId: string;
  public postFieldsId: string;
  public state: PostStateEnum;

  constructor(post?: BlogPost) {
    super();
    this.populate(post);
  }

  public populate(post?: BlogPost): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.authorId = post.authorId;
    this.state = post.state;
    this.createdAt = post.createdAt;
    this.publishedAt = post.publishedAt;
    this.postFieldsId = post.postFieldsId;
  }

  public toPOJO(): BlogPost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      publishedAt: this.publishedAt,
      state: this.state,
      authorId: this.authorId,
      postFieldsId: this.postFieldsId,
    };
  }
}
