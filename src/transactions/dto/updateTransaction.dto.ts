import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateTransactionDto {
  @IsString()
  transaction_group_id: string;

  session_id: string;

  api_transaction_id: string;

  source_system_name: string;

  @IsString()
  user_id: string;

  user_first_name: string;

  user_last_name: string;

  @IsString()
  payer_id: string;

  payer_bank_abbr: string;

  payer_bank_account: string;

  payer_msisdn: string;

  payee_bank_abbr: string;

  payee_bank_account: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  actual_amount: number;

  payee_name: string;

  response_payee_name: string;

  @IsDate()
  transferred_at: Date;

  @IsDate()
  sms_verified_at: Date;

  status_code: string;

  status_type: string;

  status_message: string;

  @IsBoolean()
  is_deleted: boolean;
}
