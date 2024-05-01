import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
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
  @MinLength(6, { message: AuthenticationValidateMessage.MinPasswordLength })
  @MaxLength(12, { message: AuthenticationValidateMessage.MaxPasswordLength })
  public password: string;
}
