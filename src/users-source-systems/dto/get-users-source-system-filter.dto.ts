import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Role } from '../../auth/roles/role.enum';

export class GetUsersSourceSystemFilterDto {
  @IsOptional()
  role?: Role;

  @IsOptional()
  @IsBoolean()
  is_blocked?: boolean;

  @IsOptional()
  @IsString()
  search?: string;
}
