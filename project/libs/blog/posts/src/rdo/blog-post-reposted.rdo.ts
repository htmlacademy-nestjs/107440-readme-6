import { PostStateEnum, PostTypeEnum, Comment } from '@project/core';
import { Expose } from 'class-transformer';

export class RepostedBlogPostRdo {
  @Expose()
  public id: string;

  @Expose()
  public type: PostTypeEnum;

  @Expose()
  public state: PostStateEnum;

  @Expose()
  public createdAt: string;

  @Expose()
  public updatedAt: string;

  @Expose()
  public userId: string;

  @Expose()
  public likesCount: number;

  @Expose()
  public tags?: string[];

  @Expose()
  public postTypeFields: unknown;

  @Expose()
  public isReposted: boolean;

  @Expose()
  public originalUserId: string;

  @Expose()
  public originalPostId: string;

  @Expose()
  public originalPostTypeFieldsId: string;

  @Expose()
  public comments: Comment[];
}
