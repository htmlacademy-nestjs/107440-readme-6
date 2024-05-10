import { SortBy, SortDirection } from '@project/core';

export const POST_RECORD_NOT_FOUND = 'Post is not found';
export const POST_TYPE_IS_INCORRECT = 'Post type is incorrect';
export const POST_TYPE_MISMATCH_ON_UPDATE =
  'Post type in dto is not matching with the type from post record';
export const POST_TYPE_DATA_IS_NOT_PROVIDED = 'Post type data is not provided';
export const POST_LIKE_CAN_NOT_BE_HANDLED =
  'Post should be in "Published" state to add or remove like';
export const POST_LIKE_EXISTS = 'This user has already liked this post';
export const POST_REPOST_USER_MISMATCH_ERROR =
  'It is not allowed to make repost of your own post';
export const POST_REPOST_WAS_ALREADY_MADE_ERROR =
  'This post was reposted before';

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT_BY = SortBy.Date;
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

export const PostsValidationMessage = {
  tags: {
    maxArraySize: 'Maximum of 8 tags allowed',
    maxTagSize: 'Tag cannot be longer than 10 characters',
    minTagSize: 'Tag must be at least 3 characters long',
  },
  videoPost: {
    titleMinLength: 'Title must be at least 10 characters long',
    titleMaxLength: 'Title cannot be longer than 50 characters',
    videoUrlError: 'Invalid video url',
  },
  textPost: {
    titleMinLength: 'Title must be at least 10 characters long',
    titleMaxLength: 'Title cannot be longer than 50 characters',
    announcementMinLength: 'Announcement must be at least 50 characters long',
    announcementMaxLength: 'Announcement cannot be longer than 255 characters',
    textMinLength: 'Text must be at least 100 characters long',
    textMaxLength: 'Text cannot be longer than 1024 characters',
  },
  linkPost: {
    descriptionMaxLength: 'Description cannot be longer than 300 characters',
    linkUrlError: 'Invalid link url',
  },
  quotePost: {
    textMinLength: 'Title must be at least 20 characters long',
    textMaxLength: 'Title cannot be longer than 300 characters',
    authorMinLength: 'Title must be at least 3 characters long',
    authorMaxLength: 'Title cannot be longer than 50 characters',
  },
} as const;
