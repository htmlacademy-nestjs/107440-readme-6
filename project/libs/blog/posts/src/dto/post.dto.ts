import {
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  ArrayMaxSize,
  MaxLength,
  MinLength,
} from 'class-validator';

import { PostTypeEnum } from '@project/core';

import { PostLinkDto } from './post.link.dto';
import { PostTextDto } from './post.text.dto';
import { PostPhotoDto } from './post.photo.dto';
import { PostVideoDto } from './post.video.dto';
import { PostQuoteDto } from './post.quote.dto';
import { PostsValidationMessage } from '../posts-module/posts.constant';

export class BlogPostDto {
  @IsString()
  @IsNotEmpty()
  public type: PostTypeEnum;

  @IsString()
  @IsMongoId()
  public userId: string;

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
  public postTypeFields: PostLinkDto &
    PostTextDto &
    PostQuoteDto &
    PostVideoDto &
    PostPhotoDto;
}
