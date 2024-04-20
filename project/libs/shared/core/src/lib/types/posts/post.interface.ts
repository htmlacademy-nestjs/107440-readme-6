import { PostStateEnum } from './post-state.enum';
import { PostTypeEnum } from './post-type.enum';

export interface BlogPost {
  id: string;
  createdAt: string;
  publishedAt: string;
  state: PostStateEnum;
  tags?: string[];
  userId: string;
  type: PostTypeEnum;
}
