import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User current password',
    example: '123456!l',
  })
  @MinLength(6, { message: AuthenticationValidateMessage.MinPasswordLength })
  @MaxLength(12, { message: AuthenticationValidateMessage.MaxPasswordLength })
  public currentPassword: string;

  @ApiProperty({
    description: 'User new password',
    example: '9876543k!',
  })
  @MinLength(6, { message: AuthenticationValidateMessage.MinPasswordLength })
  @MaxLength(12, { message: AuthenticationValidateMessage.MaxPasswordLength })
  public newPassword: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  public userId?: string;
}
