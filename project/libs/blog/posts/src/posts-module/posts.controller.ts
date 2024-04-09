import {
  Controller,
  Post,
  Delete,
  Param,
  Query,
  Put,
  Get,
  Body,
} from '@nestjs/common';
import { BlogPostDto } from '../dto';
import { BlogPostRepository } from '../repositories/post.repository';
import { BlogPostService } from './posts.service';

@Controller('posts')
export class BlogPostController {
  constructor(
    private blogPostRepository: BlogPostRepository,
    private blogPostsService: BlogPostService
  ) {}
  @Get()
  gestPosts(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('type') type: string,
    @Query('tagName') tagName: string
  ) {
    // Implementation
  }

  @Post()
  createPost(@Body() blogPostDto: BlogPostDto) {
    const blogPost = this.blogPostsService.createPost(blogPostDto);
    return blogPost;
  }

  @Put('/:postId')
  updatePost(@Param('postId') postId: string) {
    // Implementation
  }

  @Delete('/:postId')
  deletePost(@Param('postId') postId: string) {
    // Implementation
  }

  @Post('/:postId/like')
  addLikeToPost(@Param('postId') postId: string) {
    // Implementation
  }

  @Delete('/:postId/like')
  deleteLikeFromPost(@Param('postId') postId: string) {
    // Implementation
  }

  @Get('/user/:userId')
  getPostsByUserId(
    @Param('userId') userId: string,
    @Query('type') type: string,
    @Query('tagName') tagName: string
  ) {
    // Implementation
  }

  @Get('/search')
  searchPostsByTitle(@Query('title') title: string) {
    // Implementation
  }
}
