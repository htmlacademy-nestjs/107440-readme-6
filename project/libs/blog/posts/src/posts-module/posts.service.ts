import { Injectable } from '@nestjs/common';
import { PostStateEnum } from '@project/core';

import { BlogPostRepository } from '../repositories';
import { BlogPostDto } from '../dto';
import { BlogPostEntity } from '../entities';
import { BlogPostFactory, PostTypesFactory } from '../factories';

@Injectable()
export class BlogPostService {
  constructor(
    private blogPostRepository: BlogPostRepository,
    private blogPostFactory: BlogPostFactory,
    private postTypesFactory: PostTypesFactory
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

    // 2. Save everything into DB: invoke necessary repositories (postFieldsRelationRepository, blogPostRepository, postByTypeRepository)

    return blogPostEntity;
  }

  public async updatePost(dto: BlogPostDto, postId: string) {
    // Implementation
  }

  public async deletePost(postId: string) {
    // Implementation
  }

  public async addLike(postId: string) {
    // Implementation
  }

  public async removeLike(postId: string) {
    // Implementation
  }

  public async getPosts() {
    // Implementation
  }

  public async getPostsByUserId(userId: string) {
    // Implementation
  }

  public async searchPostsByTitle(title: string) {
    // Implementation
  }
}
