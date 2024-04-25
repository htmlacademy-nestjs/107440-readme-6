import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostVideoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public videoUrl?: string;
}
