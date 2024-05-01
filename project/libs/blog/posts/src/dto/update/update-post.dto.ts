import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UpdatePostLinkDto } from './update-post-link.dto';
import { UpdatePostTextDto } from './update-post-text.dto';
import { UpdatePostVideoDto } from './update-post-video.dto';
import { UpdatePostPhotoDto } from './update-post-photo.dto';
import { UpdatePostQuoteDto } from './update-post-quote.dto';
import { PostTypeEnum } from '@project/core';
import { PostsValidationMessage } from '../../posts-module/posts.constant';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  public type: PostTypeEnum;

  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true, message: PostsValidationMessage.tags.minTagSize })
  @MaxLength(10, {
    each: true,
    message: PostsValidationMessage.tags.maxTagSize,
  })
  @ArrayMaxSize(8, { message: PostsValidationMessage.tags.maxArraySize })
  @IsOptional()
  public tags?: string[];

  @IsNotEmpty()
  public postTypeFields: UpdatePostLinkDto &
    UpdatePostTextDto &
    UpdatePostQuoteDto &
    UpdatePostVideoDto &
    UpdatePostPhotoDto;
}
