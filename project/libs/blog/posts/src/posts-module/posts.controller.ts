import {
  Controller,
  Post,
  Delete,
  Param,
  Query,
  Put,
  Get,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { BlogPostDto } from '../dto';
import { BlogPostRepository } from '../repositories/post.repository';
import { BlogPostService } from './posts.service';
import { PostsResponseMessage } from './posts.constant';

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {
  constructor(
    private blogPostsRepository: BlogPostRepository,
    private blogPostsService: BlogPostService
  ) {}
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostsResponseMessage.PostsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostsResponseMessage.PostsNotFound,
  })
  @Get()
  gestPosts(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('type') type: string,
    @Query('tagName') tagName: string
  ) {
    // Implementation
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostsResponseMessage.PostCreated,
  })
  @Post()
  createPost(@Body() blogPostDto: BlogPostDto) {
    const blogPost = this.blogPostsService.createPost(blogPostDto);
    return blogPost;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostsResponseMessage.PostUpdated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostsResponseMessage.PostNotFound,
  })
  @Put('/:postId')
  updatePost(@Param('postId') postId: string) {
    // Implementation
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostsResponseMessage.PostDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostsResponseMessage.PostNotFound,
  })
  @Delete('/:postId')
  public async deletePost(@Param('postId') postId: string) {
    await this.blogPostsService.deletePost(postId);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostsResponseMessage.PostLiked,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostsResponseMessage.PostNotFound,
  })
  @Post('/:postId/like')
  addLikeToPost(@Param('postId') postId: string) {
    // Implementation
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostsResponseMessage.PostUnliked,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostsResponseMessage.PostNotFound,
  })
  @Delete('/:postId/like')
  deleteLikeFromPost(@Param('postId') postId: string) {
    // Implementation
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostsResponseMessage.PostsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostsResponseMessage.PostsNotFound,
  })
  @Get('/user/:userId')
  getPostsByUserId(
    @Param('userId') userId: string,
    @Query('type') type: string,
    @Query('tagName') tagName: string
  ) {
    // Implementation
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostsResponseMessage.PostsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostsResponseMessage.PostsNotFound,
  })
  @Get('/search')
  searchPostsByTitle(@Query('title') title: string) {
    // Implementation
  }
}
