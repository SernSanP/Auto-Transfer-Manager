import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateTransactionResponseDto {
  api_transaction_id: string;

  status_code: string;

  status_type: string;

  status_message: string;
}
