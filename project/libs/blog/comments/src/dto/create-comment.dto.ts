import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { CommentsValidationMessage } from '../comments-module/comments.constant';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: CommentsValidationMessage.MessageIsEmpty })
  public message: string;

  @IsString()
  @IsMongoId({ message: CommentsValidationMessage.InvalidID })
  public userId: string;
}
