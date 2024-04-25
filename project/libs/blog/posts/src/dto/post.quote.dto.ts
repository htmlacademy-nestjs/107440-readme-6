import { IsNotEmpty, IsString } from 'class-validator';

export class PostQuoteDto {
  @IsString()
  @IsNotEmpty()
  public text: string;

  @IsString()
  @IsNotEmpty()
  public author: string;
}
