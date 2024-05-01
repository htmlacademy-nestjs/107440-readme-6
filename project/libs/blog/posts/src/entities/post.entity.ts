import {
  BlogPost,
  Entity,
  PostStateEnum,
  PostTypeEnum,
  StorableEntity,
} from '@project/core';
import { CommentEntity, CommentFactory } from '@project/comments';

import { PostLinkEntity } from './post.link.entity';
import { PostVideoEntity } from './post.video.entity';
import { PostTextEntity } from './post.text.entity';
import { PostPhotoEntity } from './post.photo.entity';
import { PostQuoteEntity } from './post.quote.entity';
import { PostTypesFactory } from '../factories';

type PostTypeFields =
  | PostVideoEntity
  | PostLinkEntity
  | PostTextEntity
  | PostPhotoEntity
  | PostQuoteEntity;

export class BlogPostEntity extends Entity implements StorableEntity<BlogPost> {
  public createdAt?: Date;
  public updatedAt?: Date;
  public userId: string;
  public state: PostStateEnum;
  public type: PostTypeEnum;
  public likes: string[];
  public tags?: string[];
  public comments?: CommentEntity[];

  public postTypeFields?: PostTypeFields;

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
    this.createdAt = post.createdAt ?? undefined;
    this.updatedAt = post.updatedAt ?? undefined;
    this.type = post.type;
    this.state = post.state ?? PostStateEnum.Published;
    this.likes = post.likes;
    this.tags = post.tags ?? undefined;
    this.comments = [];

    this.postTypeFields = post.postTypeFields
      ? new PostTypesFactory().createPostByType(post.postTypeFields, post.type)
      : undefined;

    if (post.comments) {
      const blogCommentFactory = new CommentFactory();

      for (const comment of post.comments) {
        const blogCommentEntity = blogCommentFactory.create(comment);
        this.comments.push(blogCommentEntity);
      }
    }
  }

  public toPOJO(): BlogPost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      state: this.state,
      userId: this.userId,
      type: this.type,
      likes: this.likes,
      tags: this.tags,
      postTypeFields: this.postTypeFields?.toPOJO(),
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    };
  }
}
