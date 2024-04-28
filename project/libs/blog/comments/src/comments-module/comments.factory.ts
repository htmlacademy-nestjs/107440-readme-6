import { Injectable } from '@nestjs/common';
import { Comment, EntityFactory } from '@project/core';
import { CommentEntity } from './comments.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentFactory implements EntityFactory<CommentEntity> {
  public create(entityPlainData: Comment): CommentEntity {
    return new CommentEntity(entityPlainData);
  }

  public static createFromCreateCommentDto(
    dto: CreateCommentDto,
    postId: string
  ): CommentEntity {
    const currentDate = new Date();

    const entity = new CommentEntity();

    entity.id = undefined;
    entity.postId = postId;
    entity.message = dto.message;
    entity.userId = dto.userId;

    entity.createdAt = currentDate;
    entity.updatedAt = currentDate;

    return entity;
  }
}
