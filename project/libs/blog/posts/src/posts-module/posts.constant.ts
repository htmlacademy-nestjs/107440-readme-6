import { SortDirection } from '@project/core';

export const POST_RECORD_NOT_FOUND = 'Post is not found';
export const POST_TYPE_IS_INCORRECT = 'Post type is incorrect';
export const POST_TYPE_MISMATCH_ON_UPDATE =
  'Post type in dto is not matching with the type from post record';
export const POST_TYPE_DATA_IS_NOT_PROVIDED = 'Post type data is not provided';

export const DEFAULT_POST_COUNT_LIMIT = 10;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export const PostsResponseMessage = {
  PostsFound: 'Posts found',
  PostsNotFound: 'Posts not found',
  PostFound: 'Post found',
  PostNotFound: 'Post not found',
  PostCreated: 'The new post has been successfully created.',
  PostUpdated: 'The post has been successfully updated.',
  PostDeleted: 'The post has been successfully deleted.',
  PostLiked: 'Like has been successfully added.',
  PostUnliked: 'Like has been successfully deleted.',
  PostsNotFoundForUser: 'No posts were found for this user.',
} as const;
