export const COMMENT_RECORD_NOT_FOUND = 'Comment is not found';
export const COMMENT_DELETE_USER_ERROR =
  'The comment you are trying to delete is created by another user.';
export const COMMENT_DELETE_POST_ERROR =
  'The comment you are trying to delete does not belong to the post with passed postId.';

export const DEFAULT_COMMENTS_LIMIT = 50;
export const DEFAULT_OFFSET_VALUE = 0;

export const CommentsResponseMessage = {
  CommentsFound: 'Comments found',
  PostNotFound: 'Post not found',
  PostFound: 'Post found',
  PostOrCommentNotFound: 'Post or Comment not found',
} as const;

export const CommentsValidationMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidID: 'Invalid user id',
  MinMessageLength: 'Message in comment must be at least 10 characters long',
  MaxMessageLength: 'Message in comment cannot be longer than 300 characters',
} as const;
