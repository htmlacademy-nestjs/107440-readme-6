import { IsNotEmpty, IsString } from 'class-validator';

export class PostVideoDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public videoUrl: string;
}
