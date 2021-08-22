import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Role } from '../../Roles/role.enum';

export class GetUsersFilterDto {
  @IsOptional()
  role?: Role;

  @IsOptional()
  @IsBoolean()
  is_blocked?: boolean;

  @IsOptional()
  @IsString()
  search?: string;
}
