import { Post } from './post.interface';

export interface PostLink extends Post {
  link: string;
  description?: string;
}
