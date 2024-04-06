import { Post } from './post.interface';

export interface PostText extends Post {
  name: string;
  announcement: string;
  text: string;
}
