import { PostStateEnum } from './post-state.enum';

export interface BlogPost {
  id?: string;
  createdAt: string;
  publishedAt: string;
  state: PostStateEnum;
  tags?: string[];
  authorId?: string;
  postFieldsId?: string; // For each post type there is a separate table with all needed fields.
}
