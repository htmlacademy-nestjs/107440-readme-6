import 'multer';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import FormData from 'form-data';

import { FileInterceptor } from '@nestjs/platform-express';

import {
  ChangePasswordDto,
  SignInUserDto,
  UserDetailsRdo,
  SignUpUserDto,
  RequestWithTokenPayload,
  AuthenticationResponseMessage,
  UserRdo,
  LoggedUserRdo,
} from '@project/authentication';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';

import { ApplicationServiceURL } from './app.config';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { buildReqHeaders, fillDto } from '@project/helpers';
import { AVATAR_FILE_FORMATS, MAX_AVATAR_FILE_SIZE } from '@project/blog-user';
import { FileTypeValidationPipe } from '@project/pipes';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @Post('signup')
  public async signup(@Body() signupUserDto: SignUpUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/signup`,
      signupUserDto
    );
    return data;
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @Post('signin')
  public async signin(@Body() signinUserDto: SignInUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/signin`,
      signinUserDto
    );
    return data;
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @Get(':userId')
  public async getUserById(
    @Param('userId') userId: string,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${userId}`,
      buildReqHeaders(req)
    );

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.CurrentPasswordError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('changePassword')
  public async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/changePassword`,
      changePasswordDto,
      buildReqHeaders(req)
    );
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get(':userId/details')
  public async getUserDetails(
    @Param('userId') userId: string,
    @Req() req: Request
  ) {
    const { data: userData } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${userId}`,
      buildReqHeaders(req)
    );

    const { data: postsData } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blog}?userId=${userId}`,
      null
    );

    return fillDto(UserDetailsRdo, {
      id: userData.id,
      createdAt: userData.createdAt,
      postsCount: postsData.totalItems,
      subscribersCount: 0, // Subcsribers is not implemented yet
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.Refresh,
  })
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/refresh`,
      null,
      buildReqHeaders(req)
    );

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @UseGuards(CheckAuthGuard)
  @Patch('avatar')
  @UseInterceptors(InjectUserIdInterceptor, FileInterceptor('file'))
  public async uploadAvatar(
    @UploadedFile(
      new FileTypeValidationPipe(AVATAR_FILE_FORMATS),
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_AVATAR_FILE_SIZE }),
        ],
      })
    )
    file: Express.Multer.File,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user.sub;

    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });

    const { data: fileData } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.FileStorage}/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    const { data: userData } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Users}/avatar?userId=${userId}`,
      { avatar: fileData.id }
    );

    return userData;
  }
}
