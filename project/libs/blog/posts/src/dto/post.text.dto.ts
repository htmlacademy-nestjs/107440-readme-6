import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PostsValidationMessage } from '../posts-module/posts.constant';

export class PostTextDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(20, { message: PostsValidationMessage.textPost.titleMinLength })
  @MaxLength(50, { message: PostsValidationMessage.textPost.titleMaxLength })
  public title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(50, {
    message: PostsValidationMessage.textPost.announcementMinLength,
  })
  @MaxLength(255, {
    message: PostsValidationMessage.textPost.announcementMaxLength,
  })
  public announcement: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(100, {
    message: PostsValidationMessage.textPost.textMinLength,
  })
  @MaxLength(1024, {
    message: PostsValidationMessage.textPost.textMaxLength,
  })
  public text: string;
}
