import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';

import { Comment } from '@project/core';
import { PrismaClientService } from '@project/blog-models';

import { CommentEntity } from './comments.entity';
import { CommentFactory } from './comments.factory';
import { CommentsQuery } from './comments.query';

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
    entity.createdAt = record.createdAt;
    entity.updatedAt = record.updatedAt;
  }

  public async findById(id: string): Promise<CommentEntity> {
    const foundRecord = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!foundRecord) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(foundRecord);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }

  public async findByPostId(
    postId: string,
    query?: CommentsQuery
  ): Promise<CommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: {
        postId,
      },
      skip: query?.offset,
      take: query?.limit,
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
