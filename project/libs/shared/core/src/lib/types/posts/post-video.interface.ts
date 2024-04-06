import { Post } from './post.interface';

export interface PostVideo extends Post {
  name: string;
  linkToVideo: string;
}
