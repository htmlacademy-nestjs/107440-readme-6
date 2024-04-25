import { PostStateEnum, PostTypeEnum } from '@project/core';
import { Expose } from 'class-transformer';

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

  @Expose()
  public likes: number;

  @Expose()
  public comments: Comment[];

  @Expose()
  public tags: string[];

  @Expose()
  public postTypeId: string;
}
