import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '658170cbb954e9f5b905ccf4',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User avatar id',
    example: '663f97f715ea36199f936f7c',
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1981-03-12',
  })
  @Expose()
  public dateOfBirth: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@gmail.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Lionel',
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Messi',
  })
  @Expose()
  public lastname: string;
}
