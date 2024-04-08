import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';

export interface Post {
  id?: string;
  createdDate: string;
  publishedDate: string;
  state: PostState;
  type: PostType;
  tags?: string[];
}
