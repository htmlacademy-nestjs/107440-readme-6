import dayjs from 'dayjs';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { UserRole, Token, TokenPayload, User } from '@project/core';

import { SignUpUserDto } from '../dto/signup-user.dto';
import { SignInUserDto } from '../dto/signin-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';

import {
  AUTH_CHANGE_USER_CURRENT_PASSWORD_WRONG,
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from './authentication.constant';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService
  ) {}

  public async register(dto: SignUpUserDto): Promise<BlogUserEntity> {
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

    await this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: SignInUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUserById(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      lastname: user.lastname,
      firstname: user.firstname,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Token generation error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async decodeUserToken(request: Request): Promise<TokenPayload> {
    // @ts-expect-error auth header
    const bearerToken = request.headers.authorization;
    const token = bearerToken.split(' ')[1];

    let decodedToken;

    try {
      decodedToken = await this.jwtService.decode(token);
    } catch (error) {
      this.logger.error('[Token decode error]: ' + error.message);
      throw new HttpException(
        'Token decode error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return decodedToken as TokenPayload;
  }

  public async changePassword(
    email: string,
    dto: ChangePasswordDto
  ): Promise<BlogUserEntity> {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!(await existUser.comparePassword(dto.currentPassword))) {
      throw new UnauthorizedException(AUTH_CHANGE_USER_CURRENT_PASSWORD_WRONG);
    }

    await existUser.setPassword(dto.newPassword);

    await this.blogUserRepository.update(existUser);

    return existUser;
  }
}
