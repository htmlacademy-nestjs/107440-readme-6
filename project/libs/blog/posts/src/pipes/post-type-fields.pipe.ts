import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  BlogPostDto,
  PostLinkDto,
  PostPhotoDto,
  PostQuoteDto,
  PostTextDto,
  PostVideoDto,
} from '../dto';
import { PostTypeEnum } from '@project/core';
import { POST_TYPE_IS_INCORRECT } from '../posts-module/posts.constant';

@Injectable()
export class PostTypeFieldsValidationPipe implements PipeTransform {
  async transform(blogPostDto: BlogPostDto) {
    const { type, postTypeFields } = blogPostDto;

    let dtoClass;

    switch (type) {
      case PostTypeEnum.Video:
        dtoClass = PostVideoDto;
        break;
      case PostTypeEnum.Text:
        dtoClass = PostTextDto;
        break;
      case PostTypeEnum.Quote:
        dtoClass = PostQuoteDto;
        break;
      case PostTypeEnum.Photo:
        dtoClass = PostPhotoDto;
        break;
      case PostTypeEnum.Link:
        dtoClass = PostLinkDto;
        break;
      default:
        throw new BadRequestException(POST_TYPE_IS_INCORRECT);
    }

    const validDto: object = plainToClass(dtoClass, postTypeFields);

    const errors: ValidationError[] = await validate(validDto);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return blogPostDto;
  }
}
