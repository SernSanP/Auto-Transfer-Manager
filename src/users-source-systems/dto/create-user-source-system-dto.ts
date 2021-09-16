import { IsNotEmpty, UUIDVersion } from 'class-validator';
import { Role } from '../../auth/roles/role.enum';

export class CreateUserSourceSystemDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  source_system_name: string;

  @IsNotEmpty()
  role: Role;
}
