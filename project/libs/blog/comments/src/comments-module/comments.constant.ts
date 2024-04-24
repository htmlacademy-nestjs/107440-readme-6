export const COMMENT_RECORD_NOT_FOUND = 'Comment is not found';
export const MAX_COMMENTS_COUNT = 50;

export const CommentsResponseMessage = {
  CommentsFound: 'Comments found',
  PostNotFound: 'Post not found',
  PostFound: 'Post found',
  PostOrCommentNotFound: 'Post or Comment not found',
} as const;

export const CommentsValidationMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidID: 'Invalid user id',
} as const;
