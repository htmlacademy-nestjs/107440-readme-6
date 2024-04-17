import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PostTypeEnum } from '@project/core';

import { REPOSITORIES_MAP } from './post.repositories.constant';

@Injectable()
export class PostTypesRepository {
  constructor(private moduleRef: ModuleRef) {}

  public getRepositoryInstance(type: PostTypeEnum) {
    const repository = REPOSITORIES_MAP[type];

    if (!repository) {
      return null;
    }

    return this.moduleRef.get(repository);
  }
}
