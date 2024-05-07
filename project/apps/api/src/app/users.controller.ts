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
import { buildReqHeaders, fillDto } from '@project/helpers';

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
      buildReqHeaders(req)
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
      buildReqHeaders(req)
    );
    return data;
  }

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

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/refresh`,
      null,
      buildReqHeaders(req)
    );

    return data;
  }
}
