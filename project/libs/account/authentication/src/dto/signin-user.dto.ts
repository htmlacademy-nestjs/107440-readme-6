import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@gmail.com',
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password: string;
}
