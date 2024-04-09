import { Injectable } from '@nestjs/common';
import { PostStateEnum } from '@project/core';

import {
  BlogPostRepository,
  PostFieldsRelationsRepository,
} from '../repositories';
import { BlogPostDto } from '../dto';
import { BlogPostEntity } from '../entities';
import {
  BlogPostFactory,
  PostFieldsRelationFactory,
  PostTypesFactory,
} from '../factories';

@Injectable()
export class BlogPostService {
  constructor(
    private blogPostRepository: BlogPostRepository,
    private blogPostFactory: BlogPostFactory,
    private postTypesFactory: PostTypesFactory,
    private postFieldsRelationFactory: PostFieldsRelationFactory,
    private postFieldsRelationRepository: PostFieldsRelationsRepository
  ) {}
  public async createPost(dto: BlogPostDto): Promise<BlogPostEntity> {
    const { type, postFields } = dto;

    // 1. Create all needed entities: ParentPost, PostByType and PostFileldsRelation
    const parentPostData = {
      id: 'test_id',
      createdAt: 'test_createdAt',
      publishedAt: 'test_publishedAt',
      state: PostStateEnum.Draft,
      authorId: 'test_authorId',
      type,
    };

    const blogPostEntity = this.blogPostFactory.create(parentPostData);

    const postByTypeEntity = this.postTypesFactory.createPostByType(
      postFields,
      type
    );

    const relationData = {
      postId: blogPostEntity.id,
      postFieldsId: postByTypeEntity.id,
      type,
    };

    const postFieldsRelationEntity =
      this.postFieldsRelationFactory.create(relationData);

    // 2. Save everything into DB: invoke necessary repositories (postFieldsRelationRepository, blogPostRepository, postByTypeRepository)

    return blogPostEntity;
  }
}
