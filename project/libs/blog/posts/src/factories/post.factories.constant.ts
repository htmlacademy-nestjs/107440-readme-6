import { PostTypeEnum } from '@project/core';

import { PostTextFactory } from './post-text.factory';
import { PostQuoteFactory } from './post-quote.factory';
import { PostLinkFactory } from './post-link.factory';
import { PostVideoFactory } from './post-video.factory';
import { PostPhotoFactory } from './post-photo.factory';

export const FACTORIES_MAP = {
  [PostTypeEnum.Text]: PostTextFactory,
  [PostTypeEnum.Quote]: PostQuoteFactory,
  [PostTypeEnum.Link]: PostLinkFactory,
  [PostTypeEnum.Video]: PostVideoFactory,
  [PostTypeEnum.Photo]: PostPhotoFactory,
} as const;
