import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdatePostLinkDto } from './update-post-link.dto';
import { UpdatePostTextDto } from './update-post-text.dto';
import { UpdatePostVideoDto } from './update-post-video.dto';
import { UpdatePostPhotoDto } from './update-post-photo.dto';
import { UpdatePostQuoteDto } from './update-post-quote.dto';
import { PostTypeEnum } from '@project/core';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  public type: PostTypeEnum;

  @IsArray()
  @IsOptional()
  public tags?: string[];

  @IsNotEmpty()
  public postTypeFields: UpdatePostLinkDto &
    UpdatePostTextDto &
    UpdatePostQuoteDto &
    UpdatePostVideoDto &
    UpdatePostPhotoDto;
}
