import { PostFields } from './post.fields.interface';

export interface PostLink extends PostFields {
  link: string;
  description?: string;
}
