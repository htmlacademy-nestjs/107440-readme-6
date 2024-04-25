import { IsNotEmpty, IsString } from 'class-validator';

export class PostTextDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public announcement: string;

  @IsString()
  @IsNotEmpty()
  public text: string;
}
