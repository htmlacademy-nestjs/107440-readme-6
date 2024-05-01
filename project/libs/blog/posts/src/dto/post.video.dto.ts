import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PostsValidationMessage } from '../posts-module/posts.constant';

export class PostVideoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(20, { message: PostsValidationMessage.videoPost.titleMinLength })
  @MaxLength(50, { message: PostsValidationMessage.videoPost.titleMaxLength })
  public title: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: PostsValidationMessage.videoPost.videoUrlError })
  public videoUrl: string;
}
