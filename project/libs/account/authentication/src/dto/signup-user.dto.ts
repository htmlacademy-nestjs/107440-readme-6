import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@gmail.com',
  })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  public dateBirth: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Cristiano',
  })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ronaldo',
  })
  public lastname: string;

  @ApiProperty({
    description: 'User unique password',
    example: '123abc!*',
  })
  public password: string;
}
