import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import {
  DEFAULT_COMMENTS_LIMIT,
  DEFAULT_OFFSET_VALUE,
} from './comments.constant';

export class CommentsQuery {
  @Transform(({ value }) => +value || DEFAULT_COMMENTS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COMMENTS_LIMIT;

  @Transform(({ value }) => +value || DEFAULT_OFFSET_VALUE)
  @IsNumber()
  @IsOptional()
  public offset = DEFAULT_OFFSET_VALUE;
}
