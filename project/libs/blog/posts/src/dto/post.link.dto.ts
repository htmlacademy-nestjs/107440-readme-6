import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { PostsValidationMessage } from '../posts-module/posts.constant';

export class PostLinkDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: PostsValidationMessage.linkPost.linkUrlError })
  public link: string;

  @IsString()
  @IsOptional()
  @MaxLength(1024, {
    message: PostsValidationMessage.linkPost.descriptionMaxLength,
  })
  public description?: string;
}
