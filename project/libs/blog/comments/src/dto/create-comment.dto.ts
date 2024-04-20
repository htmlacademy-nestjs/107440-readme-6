import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment message name',
    example: 'flowers',
  })
  public message: string;
}
