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
  public likesCount: number;
  public tags?: string[];
  public comments?: CommentEntity[];

  public isReposted?: boolean;
  public originalPostId?: string;
  public originalPostTypeFieldsId?: string;
  public originalUserId?: string;

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
    this.originalPostId = post.originalPostId ?? undefined;
    this.originalPostTypeFieldsId = post.originalPostTypeFieldsId ?? undefined;
    this.userId = post.userId;
    this.originalUserId = post.originalUserId ?? undefined;
    this.createdAt = post.createdAt ?? undefined;
    this.updatedAt = post.updatedAt ?? undefined;
    this.type = post.type;
    this.state = post.state ?? PostStateEnum.Published;
    this.likes = post.likes;
    this.likesCount = post.likesCount;
    this.tags = post.tags ?? undefined;
    this.isReposted = post.isReposted ?? undefined;
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
      originalPostId: this.originalPostId,
      originalPostTypeFieldsId: this.originalPostTypeFieldsId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      state: this.state,
      userId: this.userId,
      originalUserId: this.originalUserId,
      type: this.type,
      likes: this.likes,
      likesCount: this.likesCount,
      tags: this.tags,
      isReposted: this.isReposted,
      postTypeFields: this.postTypeFields?.toPOJO(),
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    };
  }
}
