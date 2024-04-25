import { PostStateEnum } from './enums/post-state.enum';
import { PostTypeEnum } from './enums/post-type.enum';

export interface BlogPost {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  state?: PostStateEnum;
  tags?: string[];
  userId: string;
  type: PostTypeEnum;
}
