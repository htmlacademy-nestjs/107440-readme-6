import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostPhotoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public photo?: string;
}
