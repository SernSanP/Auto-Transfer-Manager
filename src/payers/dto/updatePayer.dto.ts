import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePayerDto {
  @IsString()
  payer_name: string;

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
