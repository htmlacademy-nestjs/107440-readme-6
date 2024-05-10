import { PostStateEnum } from './enums/post-state.enum';
import { PostTypeEnum } from './enums/post-type.enum';
import { PostLink } from './post-link.interface';
import { PostPhoto } from './post-photo.interface';
import { PostQuote } from './post-quote.interface';
import { PostText } from './post-text.interface';
import { PostVideo } from './post-video.interface';
import { Comment } from '../comments/comment.interface';

export interface BlogPost {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  state?: PostStateEnum;
  tags?: string[];
  userId: string;
  type: PostTypeEnum;
  likes?: string[]; // field to store ids of users who liked the post
  likesCount?: number; // field to sort posts by Prisma client
  comments?: Comment[];

  isReposted?: boolean;
  originalUserId?: string;
  originalPostId?: string;
  originalPostTypeFieldsId?: string;

  postTypeFields?: PostLink | PostVideo | PostText | PostQuote | PostPhoto;
}
