import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class UpdateTransactionDto {
  @IsNotEmpty()
  // @IsInt()
  transaction_group_id: string;

  // @IsNotEmpty()
  // session_id: string;

  // api_transaction_id: string;

  // @IsNotEmpty()
  // source_system_name: string;

  // @IsNotEmpty()
  // @IsInt()
  // user_id: string;

  // @IsNotEmpty()
  // user_first_name: string;

  // @IsNotEmpty()
  // user_last_name: string;

  // @IsInt()
  // payer_id: string;

  // payer_bank_abbr: string;

  // payer_bank_account: string;

  // payer_msisdn: string;

  // @IsNotEmpty()
  // payee_bank_abbr: string;

  // @IsNotEmpty()
  // payee_bank_account: string;

  // @IsNotEmpty()
  // @IsNumber()
  // amount: string;

  // @IsNumber()
  // actual_amount: string;

  // @IsNotEmpty()
  // payee_name: string;

  // response_payee_name: string;

  // @IsDate()
  // transferred_at: string;

  // @IsDate()
  // sms_verified_at: string;

  // status_code: string;

  // status_type: string;

  // status_message: string;

  // @IsBoolean()
  // @IsNotEmpty()
  // is_deleted: string;
}
//this is a test
