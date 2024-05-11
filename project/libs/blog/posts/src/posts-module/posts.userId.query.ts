import { IsMongoId } from 'class-validator';

export class PostsUserIdQuery {
  @IsMongoId()
  public userId: string;
}
