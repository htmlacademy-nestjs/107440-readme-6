import { PostStateEnum } from './post-state.enum';
import { PostTypeEnum } from './post-type.enum';

export interface BlogPost {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  state: PostStateEnum;
  tags?: string[];
  userId: string;
  type: PostTypeEnum;
}
