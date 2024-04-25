import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostTextDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public announcement?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public text?: string;
}
