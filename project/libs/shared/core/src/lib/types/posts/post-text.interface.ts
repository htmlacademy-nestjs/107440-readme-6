import { PostFields } from './post.fields.interface';

export interface PostText extends PostFields {
  title: string;
  announcement: string;
  text: string;
}
