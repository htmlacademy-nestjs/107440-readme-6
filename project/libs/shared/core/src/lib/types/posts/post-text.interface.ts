import { PostFields } from './post.fields.interface';

export interface PostText extends PostFields {
  name: string;
  announcement: string;
  text: string;
}
