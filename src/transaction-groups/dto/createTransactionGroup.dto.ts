import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateTransactionGroupDto {
  @IsNotEmpty()
//   @IsBoolean()
  is_running: string;
}
