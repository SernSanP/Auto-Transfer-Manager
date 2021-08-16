import { IsInt, IsOptional } from 'class-validator';

export class UpdateUserInfoDto {
  @IsOptional()
  @IsInt()
  source_system_name?: string;

  @IsOptional() li;
  @IsInt()
  limit_balance_per_transaction?: number;

  @IsOptional()
  @IsInt()
  limit_balance_per_day?: number;
}
