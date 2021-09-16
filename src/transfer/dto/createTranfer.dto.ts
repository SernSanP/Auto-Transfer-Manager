import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransferDto {
  @IsNotEmpty()
  @IsArray()
  data: string[][];

  @IsNotEmpty()
  @IsString()
  userID: string;

  @IsNotEmpty()
  @IsString()
  source_system_name: string;
}
