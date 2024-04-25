import { IsNotEmpty, IsString } from 'class-validator';

export class PostVideoDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public linkToVideo: string;
}
