import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePayerDto {
  @IsNotEmpty()
  @IsString()
  created_user_id: string;

  @IsNotEmpty()
  source_system_name: string;

  @IsNotEmpty()
  payer_bank_abbr: string;

  @IsNotEmpty()
  payer_bank_account: string;

  @IsNotEmpty()
  payer_msisdn: string;
}
