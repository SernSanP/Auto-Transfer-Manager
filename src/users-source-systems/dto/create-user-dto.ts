import { IsNotEmpty } from 'class-validator';
import { Role } from '../../Roles/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  created_user_id: string;

  @IsNotEmpty()
  role: Role;
}
