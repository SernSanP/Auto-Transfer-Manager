import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransferDto {
  @IsNotEmpty()
  @IsString()
  source_system_name: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  payer_id: string;

  @IsNotEmpty()
  @IsString()
  payee_bank_abbr: string;

  @IsNotEmpty()
  @IsString()
  payee_bank_account: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  payee_name: string;
}
