import {
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CommentsValidationMessage } from '../comments-module/comments.constant';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: CommentsValidationMessage.MessageIsEmpty })
  @MinLength(10, { message: CommentsValidationMessage.MinMessageLength })
  @MaxLength(300, { message: CommentsValidationMessage.MaxMessageLength })
  public message: string;

  @IsString()
  @IsMongoId({ message: CommentsValidationMessage.InvalidID })
  public userId: string;
}
