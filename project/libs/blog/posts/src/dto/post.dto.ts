import {
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';

import { PostTypeEnum } from '@project/core';

import { PostLinkDto } from './post.link.dto';
import { PostTextDto } from './post.text.dto';
import { PostPhotoDto } from './post.photo.dto';
import { PostVideoDto } from './post.video.dto';
import { PostQuoteDto } from './post.quote.dto';

export class BlogPostDto {
  @IsString()
  @IsNotEmpty()
  public type: PostTypeEnum;

  @IsString()
  @IsMongoId()
  public userId: string;

  @IsArray()
  @IsOptional()
  public tags?: string[];

  @IsNotEmpty()
  public postTypeFields: PostLinkDto &
    PostTextDto &
    PostQuoteDto &
    PostVideoDto &
    PostPhotoDto;
}
