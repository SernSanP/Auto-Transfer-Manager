import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePayerDto {
  @IsNotEmpty()
  @IsInt()
  created_user_id: number;

  @IsNotEmpty()
  source_system_name: string;

  @IsNotEmpty()
  payer_bank_abbr: string;

  @IsNotEmpty()
  payer_bank_account: string;

  @IsNotEmpty()
  payer_msisdn: string;

  @IsNotEmpty()
  @IsBoolean()
  is_disabled: boolean;
}
