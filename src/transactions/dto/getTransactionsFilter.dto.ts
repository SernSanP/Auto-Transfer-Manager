import {
    IsBoolean,
    IsEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class GetTransactionsFilterDto {
    @IsOptional()
    source_system_name?: string;
  
    @IsOptional()
    transaction_group_id?:string;
  }
  