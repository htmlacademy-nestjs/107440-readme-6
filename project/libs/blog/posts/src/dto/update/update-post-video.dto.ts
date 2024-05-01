import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PostsValidationMessage } from '../../posts-module/posts.constant';

export class UpdatePostVideoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(20, { message: PostsValidationMessage.videoPost.titleMinLength })
  @MaxLength(50, { message: PostsValidationMessage.videoPost.titleMaxLength })
  public title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsUrl({}, { message: PostsValidationMessage.videoPost.videoUrlError })
  public videoUrl?: string;
}
