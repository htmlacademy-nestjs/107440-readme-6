import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostVideoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public linkToVideo?: string;
}
