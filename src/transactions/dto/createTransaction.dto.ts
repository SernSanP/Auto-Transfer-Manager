import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  transaction_group_id: string;

  @IsNotEmpty()
  source_system_name: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  user_first_name: string;

  @IsNotEmpty()
  user_last_name: string;

  @IsString()
  payer_id: string;

  payer_bank_abbr: string;

  payer_bank_account: string;

  payer_msisdn: string;

  @IsNotEmpty()
  payee_bank_abbr: string;

  @IsNotEmpty()
  payee_bank_account: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  payee_name: string;

}
