import { IsNotEmpty, IsString } from 'class-validator';

export class PostPhotoDto {
  @IsString()
  @IsNotEmpty()
  public photo: string;
}
