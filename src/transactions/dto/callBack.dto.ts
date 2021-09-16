import { IsNumber, IsString } from "class-validator";

export class UpdateTransactionCallbackDto {
  @IsNumber()
  actual_amount: number;

  @IsString()
  response_payee_name: string;

  @IsString()
  status_code: string;

  @IsString()
  status_type: string;

  @IsString()
  status_message: string;
}