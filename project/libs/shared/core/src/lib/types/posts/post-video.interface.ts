import { PostFields } from './post.fields.interface';

export interface PostVideo extends PostFields {
  title: string;
  videoUrl: string;
}
