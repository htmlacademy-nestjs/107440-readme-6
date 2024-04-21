import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User current password',
    example: '123456!l',
  })
  public currentPassword: string;

  @ApiProperty({
    description: 'User new password',
    example: '9876543k!',
  })
  public newPassword: string;
}
