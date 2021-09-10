import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StartTransferDto {
  @IsNotEmpty()
  @IsString()
  payer_id: string;

  @IsNotEmpty()
  @IsArray()
  transactionlist: string[];
}
