import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PostsValidationMessage } from '../../posts-module/posts.constant';

export class UpdatePostQuoteDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(20, {
    message: PostsValidationMessage.quotePost.textMinLength,
  })
  @MaxLength(300, {
    message: PostsValidationMessage.quotePost.textMaxLength,
  })
  public text?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3, {
    message: PostsValidationMessage.quotePost.authorMinLength,
  })
  @MaxLength(50, {
    message: PostsValidationMessage.quotePost.authorMaxLength,
  })
  public author?: string;
}
