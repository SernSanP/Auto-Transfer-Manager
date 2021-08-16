import { IsNotEmpty } from 'class-validator';
import { Role } from '../user-role.enum';

export class CreateUserDto {
    @IsNotEmpty()
    source_system_name: string;
  
    @IsNotEmpty()
    role: Role;
  
}
