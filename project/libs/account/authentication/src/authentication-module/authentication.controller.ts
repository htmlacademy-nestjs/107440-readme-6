import { Body, Controller, Post, Get, Param } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { SignUpUserDto } from '../dto/signup-user.dto';
import { SignInUserDto } from '../dto/signin-user.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('signup')
  public async signup(@Body() dto: SignUpUserDto) {
    const newUser = await this.authService.register(dto);
    return newUser.toPOJO();
  }

  @Post('sigin')
  public async signin(@Body() dto: SignInUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return verifiedUser.toPOJO();
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUserById(id);
    return existUser.toPOJO();
  }
}
