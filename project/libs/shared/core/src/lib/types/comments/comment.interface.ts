export interface Comment {
  id?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string;
  userId: string;
}
