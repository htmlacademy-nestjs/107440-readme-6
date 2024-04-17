import { PostFields } from './post.fields.interface';

export interface PostQuote extends PostFields {
  text: string;
  author: string;
}
