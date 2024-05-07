import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ChangePasswordDto,
  SignInUserDto,
  UserDetailsRdo,
  SignUpUserDto,
} from '@project/authentication';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';

import { ApplicationServiceURL } from './app.config';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { fillDto } from '@project/helpers';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Post('signup')
  public async signup(@Body() signupUserDto: SignUpUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/signup`,
      signupUserDto
    );
    return data;
  }

  @Post('signin')
  public async signin(@Body() signinUserDto: SignInUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/signin`,
      signinUserDto
    );
    return data;
  }

  @Get(':userId')
  public async getUserById(
    @Param('userId') userId: string,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${userId}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

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
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @Get(':userId/details')
  public async getUserDetails(
    @Param('userId') userId: string,
    @Req() req: Request
  ) {
    console.log('getUserDetails, userId - ', userId);
    const { data: userData } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${userId}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
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

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }
}
