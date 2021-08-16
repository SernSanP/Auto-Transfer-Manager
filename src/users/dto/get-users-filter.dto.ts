import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  @IsBoolean()
  is_admin?: boolean;

  @IsOptional()
  @IsBoolean()
  is_blocked?:boolean

  @IsOptional()
  @IsString()
  search?: string;
}
