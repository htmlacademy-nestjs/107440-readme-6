import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostQuoteDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public text?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public author?: string;
}
