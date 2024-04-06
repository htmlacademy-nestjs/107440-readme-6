import { Entity } from '@project/core';

export abstract class PostEntity extends Entity {
  public tags? = undefined;
  public createdDate = '';
  public publishedDate = '';
  public state = '';
  public type = '';
}
