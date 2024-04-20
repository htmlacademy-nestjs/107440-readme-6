import { ConflictException, Injectable } from '@nestjs/common';
import { PostTypeEnum } from '@project/core';

import { BlogPostRepository } from '../repositories';
import { BlogPostDto } from '../dto';
import {
  POST_RECORD_NOT_FOUND,
  POST_TYPE_DATA_IS_NOT_PROVIDED,
  POST_TYPE_IS_INCORRECT,
} from './posts.constant';

@Injectable()
export class BlogPostService {
  constructor(private blogPostRepository: BlogPostRepository) {}
  public async createPost(dto: BlogPostDto): Promise<void> {
    const { type, postFields } = dto;

    if (!type || !(type in PostTypeEnum)) {
      throw new ConflictException(POST_TYPE_IS_INCORRECT);
    }

    if (!postFields) {
      throw new ConflictException(POST_TYPE_DATA_IS_NOT_PROVIDED);
    }

    // Implementation
  }

  public async updatePost(dto: BlogPostDto, postId: string) {
    // Implementation
  }

  public async deletePost(postId: string) {
    const existPost = await this.blogPostRepository.findById(postId);

    if (!existPost) {
      throw new ConflictException(POST_RECORD_NOT_FOUND);
    }

    await this.blogPostRepository.deleteById(postId);
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
