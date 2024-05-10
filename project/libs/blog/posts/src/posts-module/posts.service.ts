import { ConflictException, Injectable } from '@nestjs/common';
import { PaginationResult, PostStateEnum } from '@project/core';

import { BlogPostRepository, PostTypesRepository } from '../repositories';
import { BlogPostDto } from '../dto';
import {
  POST_LIKE_CAN_NOT_BE_HANDLED,
  POST_LIKE_EXISTS,
  POST_TYPE_MISMATCH_ON_UPDATE,
} from './posts.constant';
import { BlogPostFactory, PostTypesFactory } from '../factories';
import { BlogPostEntity } from '../entities';
import { UpdatePostDto } from '../dto/update';
import { BlogPostQuery } from './posts.query';
import { PostNotFoundException } from '../exceptions/post-not-found.exception';

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
    const existsPost = await this.blogPostRepository.findById(postId);

    if (dto.type !== existsPost.type) {
      throw new ConflictException(POST_TYPE_MISMATCH_ON_UPDATE);
    }

    let hasPostTypeFieldsChanges = false;

    let hasTagsChanged = false;

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

    // For now it's a simple check for length property
    if (
      (dto.tags && !existsPost.tags) ||
      (dto.tags &&
        existsPost.tags &&
        dto.tags.length !== existsPost.tags.length)
    ) {
      existsPost.tags = dto.tags;
      hasTagsChanged = true;
    }

    if (!hasPostTypeFieldsChanges && !hasTagsChanged) {
      return existsPost;
    }

    await this.blogPostRepository.update(existsPost);

    return existsPost;
  }

  public async deletePost(postId: string) {
    try {
      await this.blogPostRepository.deleteById(postId);
    } catch {
      throw new PostNotFoundException(postId);
    }
  }

  public async addLike(postId: string, userId: string) {
    const existsPost = await this.getPostById(postId);

    if (existsPost.state !== PostStateEnum.Published) {
      throw new ConflictException(POST_LIKE_CAN_NOT_BE_HANDLED);
    }

    if (existsPost.likes.includes(userId)) {
      throw new ConflictException(POST_LIKE_EXISTS);
    }

    existsPost.likes.push(userId);

    await this.blogPostRepository.update(existsPost);

    return existsPost;
  }

  public async removeLike(postId: string, userId: string) {
    const existsPost = await this.getPostById(postId);

    if (existsPost.state !== PostStateEnum.Published) {
      throw new ConflictException(POST_LIKE_CAN_NOT_BE_HANDLED);
    }

    existsPost.likes = existsPost.likes.filter(
      (userIdFromArr) => userIdFromArr !== userId
    );

    await this.blogPostRepository.update(existsPost);

    return existsPost;
  }

  public async getAllPosts(
    query?: BlogPostQuery,
    state?: PostStateEnum
  ): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query, state);
  }

  public async searchByTitle(title: string) {
    return this.blogPostRepository.findByTitle(title);
  }

  public async getPostById(postId: string): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(postId);

    if (!existsPost) {
      throw new PostNotFoundException(postId);
    }

    return existsPost;
  }
}
