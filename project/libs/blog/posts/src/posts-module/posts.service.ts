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
} from './posts.constant';
import { BlogPostFactory, PostTypesFactory } from '../factories';
import { BlogPostEntity } from '../entities';

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

  public async updatePost(dto: BlogPostDto, postId: string) {
    // Implementation
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

  public async getPosts() {
    // Implementation
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
