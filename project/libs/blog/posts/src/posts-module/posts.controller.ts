import {
  Controller,
  Post,
  Delete,
  Param,
  Query,
  Put,
  Get,
} from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get('/')
  gestPosts(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('type') type: string,
    @Query('tagName') tagName: string
  ) {
    // Implementation
  }

  @Post('/')
  createPost() {
    // Implementation
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

  @Get(':userId/posts')
  getPostsByUser(@Param('userId') userId: string) {
    // Implementation
  }
}
