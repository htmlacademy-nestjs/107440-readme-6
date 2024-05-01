import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';

import { PostPhotoFactory } from '../factories/post-photo.factory';
import { PostPhotoEntity } from '../entities/post.photo.entity';
import { PrismaClientService } from '@project/blog-models';

@Injectable()
export class PostPhotoRepository extends BasePostgresRepository<PostPhotoEntity> {
  constructor(
    entityFactory: PostPhotoFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: PostPhotoEntity): Promise<void> {
    const record = await this.client.photoPost.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }
}
