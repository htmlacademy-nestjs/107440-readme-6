export const POST_RECORD_NOT_FOUND = 'Post is not found';
export const POST_TYPE_IS_INCORRECT = 'Post type is incorrect';
export const POST_TYPE_DATA_IS_NOT_PROVIDED = 'Post type data is not provided';

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
