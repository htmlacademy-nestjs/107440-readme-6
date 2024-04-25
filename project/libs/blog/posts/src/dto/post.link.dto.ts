import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostLinkDto {
  @IsString()
  @IsNotEmpty()
  public link: string;

  @IsString()
  @IsOptional()
  public description?: string;
}
