import { PostTypeEnum } from '@project/core';

import { PostPhotoRepository } from './post-photo.repository';
import { PostVideoRepository } from './post-video.repository';
import { PostLinkRepository } from './post-link.repository';
import { PostQuoteRepository } from './post-quote.repository';
import { PostTextRepository } from './post-text.repository';

export const REPOSITORIES_MAP = {
  [PostTypeEnum.Text]: PostTextRepository,
  [PostTypeEnum.Quote]: PostQuoteRepository,
  [PostTypeEnum.Link]: PostLinkRepository,
  [PostTypeEnum.Video]: PostVideoRepository,
  [PostTypeEnum.Photo]: PostPhotoRepository,
} as const;
