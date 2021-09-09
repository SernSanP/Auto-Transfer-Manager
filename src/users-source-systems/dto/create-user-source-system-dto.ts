import { IsNotEmpty } from 'class-validator';
import { Role } from '../../auth/roles/role.enum';

export class CreateUserSourceSystemDto {
  @IsNotEmpty()
  role: Role;
}
