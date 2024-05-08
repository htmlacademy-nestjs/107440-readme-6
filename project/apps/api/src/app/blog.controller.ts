import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { BlogPostDto, BlogPostQuery } from '@project/posts';
import { InjectUserIdInterceptor } from '@project/interceptors';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { RequestWithTokenPayload } from '@project/authentication';

@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post()
  public async create(@Body() dto: BlogPostDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/`,
      dto
    );
    return data;
  }

  @Get()
  public async getPosts(@Query() query: BlogPostQuery) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blog}`,
      {
        params: query,
      }
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post(':postId/like')
  public async addLike(
    @Param('postId') postId: string,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user.sub;

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/${postId}/like/${userId}`
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Delete(':postId/like')
  public async removeLike(
    @Param('postId') postId: string,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user.sub;

    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blog}/${postId}/like/${userId}`
    );

    return data;
  }
}
