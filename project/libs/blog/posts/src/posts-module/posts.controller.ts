import {
  Controller,
  Post,
  Delete,
  Param,
  Query,
  Get,
  Body,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';

import { BlogPostDto } from '../dto';
import { BlogPostService } from './posts.service';
import { PostsResponseMessage } from './posts.constant';
import { BlogPostRdo } from '../rdo/blog-post.rdo';
import { UpdatePostDto } from '../dto/update';
import { BlogPostWithPaginationRdo } from '../rdo/blog-post-with-pagination.rdo';
import { BlogPostQuery } from './posts.query';

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {
  constructor(private blogPostsService: BlogPostService) {}
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostsResponseMessage.PostsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostsResponseMessage.PostsNotFound,
  })
  @Get()
  public async getPosts(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.blogPostsService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    };
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostsResponseMessage.PostCreated,
  })
  @Post()
  public async createPost(@Body() blogPostDto: BlogPostDto) {
    const blogPostFull = await this.blogPostsService.createPost(blogPostDto);
    return fillDto(BlogPostRdo, blogPostFull.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostsResponseMessage.PostUpdated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostsResponseMessage.PostNotFound,
  })
  @Patch('/:postId')
  public async updatePost(
    @Param('postId') postId: string,
    @Body() blogPostDto: UpdatePostDto
  ) {
    const updatedPost = await this.blogPostsService.updatePost(
      blogPostDto,
      postId
    );
    return fillDto(BlogPostRdo, updatedPost.toPOJO());
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

  @Get('/:postId')
  public async getPost(@Param('postId') postId: string) {
    const post = await this.blogPostsService.getPost(postId);
    return fillDto(BlogPostRdo, post.toPOJO());
  }
}
