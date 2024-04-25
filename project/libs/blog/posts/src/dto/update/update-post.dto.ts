import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { UpdatePostLinkDto } from './update-post-link.dto';
import { UpdatePostTextDto } from './update-post-text.dto';
import { UpdatePostVideoDto } from './update-post-video.dto';
import { UpdatePostPhotoDto } from './update-post-photo.dto';
import { UpdatePostQuoteDto } from './update-post-quote.dto';

export class UpdatePostDto {
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @IsNotEmpty()
  public postFields: UpdatePostLinkDto &
    UpdatePostTextDto &
    UpdatePostQuoteDto &
    UpdatePostVideoDto &
    UpdatePostPhotoDto;
}
