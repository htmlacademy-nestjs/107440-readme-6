import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { NotifyService } from '@project/account-notify';

import { MongoIdValidationPipe } from '@project/pipes';
import { fillDto } from '@project/helpers';

import { AuthenticationService } from './authentication.service';
import { SignUpUserDto } from '../dto/signup-user.dto';
import { SignInUserDto } from '../dto/signin-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';

import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { AuthenticationResponseMessage } from './authentication.constant';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @Post('signup')
  public async signup(@Body() dto: SignUpUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, firstname, lastname } = newUser;

    await this.notifyService.registerSubscriber({ email, firstname, lastname });

    return newUser.toPOJO();
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
  public async signin(@Body() dto: SignInUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);

    const userToken = await this.authService.createUserToken(verifiedUser);

    return fillDto(LoggedUserRdo, { ...verifiedUser.toPOJO(), ...userToken });
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
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUserById(id);
    return existUser.toPOJO();
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.CurrentPasswordError,
  })
  @Post('/changePassword')
  @UseGuards(JwtAuthGuard)
  public async changePassword(
    @Body() dto: ChangePasswordDto,
    @Req() request: Request
  ) {
    const decodedToken = await this.authService.decodeUserToken(request);

    const updatedUser = await this.authService.changePassword(
      decodedToken.email,
      dto
    );

    return updatedUser.toPOJO();
  }
}
