import { IsNotEmpty } from 'class-validator';
import { Role } from '../../Roles/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  source_system_name: string;

  @IsNotEmpty()
  role: Role;
}
