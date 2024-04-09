import { PostTypeEnum } from '@project/core';

import { PostLinkDto } from './post.link.dto';
import { PostTextDto } from './post.text.dto';
import { PostPhotoDto } from './post.photo.dto';
import { PostVideoDto } from './post.video.dto';
import { PostQuoteDto } from './post.quote.dto';

export class BlogPostDto {
  type: PostTypeEnum;
  tags?: string[];
  postFields: PostLinkDto &
    PostTextDto &
    PostQuoteDto &
    PostVideoDto &
    PostPhotoDto;
}
