import dayjs from 'dayjs';
import { ConflictException, Injectable } from '@nestjs/common';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { UserRole } from '@project/core';

import { SignUpUserDto } from '../dto/signup-user.dto';
import { AUTH_USER_EXISTS } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async register(dto: SignUpUserDto) {
    const { email, firstname, lastname, password, dateBirth } = dto;

    const blogUser = {
      email,
      firstname,
      lastname,
      role: UserRole.User,
      avatar: '',
      dateOfBirth: dayjs(dateBirth).toDate(),
      passwordHash: '',
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    return this.blogUserRepository.save(userEntity);
  }
}
