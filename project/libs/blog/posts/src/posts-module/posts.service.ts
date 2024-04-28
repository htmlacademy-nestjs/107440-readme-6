import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BlogPostRepository, PostTypesRepository } from '../repositories';
import { BlogPostDto } from '../dto';
import {
  POST_TYPE_DATA_IS_NOT_PROVIDED,
  POST_TYPE_IS_INCORRECT,
  POST_TYPE_MISMATCH_ON_UPDATE,
} from './posts.constant';
import { BlogPostFactory, PostTypesFactory } from '../factories';
import { BlogPostEntity } from '../entities';
import { UpdatePostDto } from '../dto/update';
import { BlogPostQuery } from './posts.query';
import { PaginationResult } from '@project/core';

@Injectable()
export class BlogPostService {
  constructor(
    private blogPostRepository: BlogPostRepository,
    private blogPostFactory: BlogPostFactory,
    private postTypesRepository: PostTypesRepository,
    private postTypesFactory: PostTypesFactory
  ) {}
  public async createPost(dto: BlogPostDto): Promise<BlogPostEntity> {
    const { type } = dto;

    const { postTypeFields, ...restFields } = dto;

    if (!type) {
      throw new ConflictException(POST_TYPE_IS_INCORRECT);
    }

    if (!postTypeFields) {
      throw new ConflictException(POST_TYPE_DATA_IS_NOT_PROVIDED);
    }

    const newPost = this.blogPostFactory.create(restFields);

    await this.blogPostRepository.save(newPost);

    const postTypeRepository =
      this.postTypesRepository.getRepositoryInstance(type);

    const newPostType = this.postTypesFactory.createPostByType(
      {
        ...postTypeFields,
        postId: newPost.id,
      },
      type
    );

    //@ts-expect-error types
    await postTypeRepository.save(newPostType);

    newPost.postTypeFields = newPostType;

    return newPost;
  }

  public async updatePost(dto: UpdatePostDto, postId: string) {
    if (!dto.type) {
      throw new ConflictException(POST_TYPE_IS_INCORRECT);
    }

    if (!dto.postTypeFields) {
      throw new ConflictException(POST_TYPE_DATA_IS_NOT_PROVIDED);
    }

    const existsPost = await this.blogPostRepository.findById(postId);

    if (dto.type !== existsPost.type) {
      throw new ConflictException(POST_TYPE_MISMATCH_ON_UPDATE);
    }

    let hasPostTypeFieldsChanges = false;

    for (const [key, value] of Object.entries(dto.postTypeFields)) {
      if (
        value !== undefined &&
        key !== '' &&
        existsPost.postTypeFields[key] !== value
      ) {
        existsPost.postTypeFields[key] = value;
        hasPostTypeFieldsChanges = true;
      }
    }

    if (!hasPostTypeFieldsChanges) {
      return existsPost;
    }

    await this.blogPostRepository.update(existsPost);

    return existsPost;
  }

  public async deletePost(postId: string) {
    try {
      await this.blogPostRepository.deleteById(postId);
    } catch {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
  }

  public async addLike(postId: string) {
    // Implementation
  }

  public async removeLike(postId: string) {
    // Implementation
  }

  public async getAllPosts(
    query?: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async getPostsByUserId(userId: string) {
    // Implementation
  }

  public async searchPostsByTitle(title: string) {
    // Implementation
  }

  public async getPost(postId: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(postId);
  }
}
