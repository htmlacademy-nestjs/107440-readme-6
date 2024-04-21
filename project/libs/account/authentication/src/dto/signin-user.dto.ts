import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class SignInUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@gmail.com',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  public password: string;
}
