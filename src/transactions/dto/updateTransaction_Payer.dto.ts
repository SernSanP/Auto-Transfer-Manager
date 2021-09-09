import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateTransactionPayerDto {
  payer_id: string;

  payer_bank_abbr:string

  payer_bank_account: string;

  payer_msisdn: string;
}
