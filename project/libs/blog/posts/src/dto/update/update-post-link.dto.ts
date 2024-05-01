import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { PostsValidationMessage } from '../../posts-module/posts.constant';

export class UpdatePostLinkDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsUrl({}, { message: PostsValidationMessage.linkPost.linkUrlError })
  public link?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(1024, {
    message: PostsValidationMessage.linkPost.descriptionMaxLength,
  })
  public description?: string;
}
