import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostLinkDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public link?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description?: string;
}
