import { PostTypeEnum } from './post-type.enum';

export interface PostFieldsRelation {
  postId?: string;
  type: PostTypeEnum;
  postFieldsId: string; // For each post type there is a separate table with all needed fields.
}

/*

 Table 1: Post

 Table 2: PostFieldRelation

 Table 3: VideoPost
 Table 4: TextPost
 .etc

*/
