import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDetailsRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '658170cbb954e9f5b905ccf4',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Date when user record was created',
    example: '1981-03-12',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Amount of posts created by this user',
    example: '5',
  })
  @Expose()
  public postsCount: number;

  @ApiProperty({
    description: 'Amount fo subscribers',
    example: '12',
  })
  @Expose()
  public subscribersCount: number;
}
