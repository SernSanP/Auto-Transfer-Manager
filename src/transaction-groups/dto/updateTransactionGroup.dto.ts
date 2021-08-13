import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTransactionGroupDto {
  @IsNotEmpty()
  @IsBoolean()
  is_running: boolean;
}
