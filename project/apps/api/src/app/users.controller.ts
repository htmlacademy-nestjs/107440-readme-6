import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req } from '@nestjs/common';

import { SignInUserDto } from '@project/authentication';

import { ApplicationServiceURL } from './app.config';

@Controller('users')
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Post('signin')
  public async login(@Body() signinUserDto: SignInUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/signin`,
      signinUserDto
    );
    return data;
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
