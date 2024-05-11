import { TokenPayload } from '@project/core';

export interface RequestWithTokenPayload extends Request {
  user?: TokenPayload;
}
