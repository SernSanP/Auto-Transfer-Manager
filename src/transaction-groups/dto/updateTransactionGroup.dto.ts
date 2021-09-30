import { IsBoolean, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTransactionGroupDto {
  @IsOptional()
  @IsBoolean()
  is_running?: boolean;

  @IsOptional()
  @IsDate()
  begin_transfered_at?: Date;
  
  @IsOptional()
  @IsDate()
  end_transfered_at?: Date;
}
