import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateTransactionDto {
  api_transaction_id: string;

  status_code: string;

  status_type: string;

  status_message: string;
}

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
