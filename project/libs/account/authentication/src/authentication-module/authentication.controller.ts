import { Body, Controller, Post } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { SignUpUserDto } from '../dto/signup-user.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('signup')
  public async create(@Body() dto: SignUpUserDto) {
    const newUser = await this.authService.register(dto);
    return newUser.toPOJO();
  }
}
