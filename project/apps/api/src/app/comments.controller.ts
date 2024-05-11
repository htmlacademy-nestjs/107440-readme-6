import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import {
  CommentsQuery,
  CommentsResponseMessage,
  CreateCommentDto,
} from '@project/comments';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { BlogPost, PostStateEnum } from '@project/core';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { RequestWithTokenPayload } from '@project/authentication';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('blog/:postId/comments')
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(private readonly httpService: HttpService) {}

  public async getBlogPost(postId: string): Promise<BlogPost> {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blog}/${postId}`
    );

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentsResponseMessage.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsResponseMessage.PostNotFound,
  })
  @Get()
  public async getAllComments(
    @Param('postId') postId: string,
    @Query() query?: CommentsQuery
  ) {
    const blogPost = await this.getBlogPost(postId);

    if (blogPost.state !== PostStateEnum.Published) {
      throw new ConflictException(
        `You can get comments only for published posts. Post with ${postId} id is in "${blogPost.state}" state.`
      );
    }

    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blog}/${postId}/comments`,
      {
        params: query,
      }
    );

    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CommentsResponseMessage.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsResponseMessage.PostNotFound,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post()
  public async create(
    @Param('postId') postId: string,
    @Body() dto: Partial<CreateCommentDto>
  ) {
    const blogPost = await this.getBlogPost(postId);

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/${blogPost.id}/comments`,
      dto
    );

    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: CommentsResponseMessage.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsResponseMessage.PostOrCommentNotFound,
  })
  @UseGuards(CheckAuthGuard)
  @Delete(':commentId')
  public async delete(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user?.sub;

    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blog}/${postId}/comments/${commentId}/users/${userId}`
    );

    return data;
  }
}
