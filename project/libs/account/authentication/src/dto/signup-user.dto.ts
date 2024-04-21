import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsString } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class SignUpUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@gmail.com',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: AuthenticationValidateMessage.DateBirthNotValid })
  public dateBirth: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Cristiano',
  })
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ronaldo',
  })
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'User unique password',
    example: '123abc!*',
  })
  @IsString()
  public password: string;
}
