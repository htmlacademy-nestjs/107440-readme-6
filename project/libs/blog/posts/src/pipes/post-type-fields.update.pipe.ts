import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { PostPhotoDto, PostQuoteDto } from '../dto';
import { PostTypeEnum } from '@project/core';
import { POST_TYPE_IS_INCORRECT } from '../posts-module/posts.constant';
import {
  UpdatePostDto,
  UpdatePostLinkDto,
  UpdatePostTextDto,
  UpdatePostVideoDto,
} from '../dto/update';

@Injectable()
export class PostTypeFieldsUpdateValidationPipe implements PipeTransform {
  async transform(value: UpdatePostDto | string, metadata: ArgumentMetadata) {
    // value can be a post id
    if (metadata.type === 'param') return value;

    const blogPostDto = value as UpdatePostDto;

    const { type, postTypeFields } = blogPostDto;

    let dtoClass;

    switch (type) {
      case PostTypeEnum.Video:
        dtoClass = UpdatePostVideoDto;
        break;
      case PostTypeEnum.Text:
        dtoClass = UpdatePostTextDto;
        break;
      case PostTypeEnum.Quote:
        dtoClass = PostQuoteDto;
        break;
      case PostTypeEnum.Photo:
        dtoClass = PostPhotoDto;
        break;
      case PostTypeEnum.Link:
        dtoClass = UpdatePostLinkDto;
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
