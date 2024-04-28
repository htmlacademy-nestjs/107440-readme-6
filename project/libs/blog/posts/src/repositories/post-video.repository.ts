import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { PostVideo } from '@project/core';
import { PrismaClientService } from '@project/blog-models';

import { PostVideoFactory } from '../factories/post-video.factory';
import { PostVideoEntity } from '../entities/post.video.entity';

@Injectable()
export class PostVideoRepository extends BasePostgresRepository<
  PostVideoEntity,
  PostVideo
> {
  constructor(
    entityFactory: PostVideoFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: PostVideoEntity): Promise<void> {
    const record = await this.client.videoPost.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }
}
