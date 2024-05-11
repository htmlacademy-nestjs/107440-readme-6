import { IsMongoId } from 'class-validator';

export class UserAvatarQuery {
  @IsMongoId()
  public userId: string;
}
