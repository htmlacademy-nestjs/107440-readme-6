import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';

import { Comment } from '@project/core';
import { PrismaClientService } from '@project/blog-models';

import { CommentEntity } from './comments.entity';
import { CommentFactory } from './comments.factory';

@Injectable()
export class CommentsRepository extends BasePostgresRepository<
  CommentEntity,
  Comment
> {
  constructor(
    entityFactory: CommentFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: CommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }

  public async findById(id: string): Promise<CommentEntity> {
    const foundRecord = await this.client.comment.findUnique({
      where: {
        id,
      },
    });

    return this.createEntityFromDocument(foundRecord);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }
}
