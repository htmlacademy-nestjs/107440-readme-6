import { PostStateEnum, PostTypeEnum, Comment } from '@project/core';
import { Expose, Transform } from 'class-transformer';

export class BlogPostRdo {
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

  @Transform(({ value }) => value?.length || 0)
  @Expose()
  public likes: number;

  @Expose()
  public tags?: string[];

  @Expose()
  public postTypeFields: unknown;

  @Expose()
  public comments: Comment[];
}
