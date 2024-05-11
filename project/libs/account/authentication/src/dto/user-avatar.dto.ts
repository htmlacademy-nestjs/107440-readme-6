import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class UserAvatarDto {
  @ApiProperty({
    description: 'ID of avatar file',
    example: '663244e674d85f1031cea6f3',
  })
  @IsString()
  @IsMongoId()
  public avatar: string;
}
