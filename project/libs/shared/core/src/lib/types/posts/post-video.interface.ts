import { PostFields } from './post.fields.interface';

export interface PostVideo extends PostFields {
  name: string;
  linkToVideo: string;
}
