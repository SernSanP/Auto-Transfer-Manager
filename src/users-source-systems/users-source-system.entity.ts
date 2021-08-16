import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './user-role.enum';
import { Exclude } from 'class-transformer';
import { SourceSystem } from 'src/source-systems/source-system.entity';

@Entity()
export class UsersSourceSystem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  source_system_name: string;

  @Column()
  role: Role;

  @Column()
  limit_balance_per_transaction: number;

  @Column()
  limit_balance_per_day: number;

  @Column()
  is_blocked: boolean;

  @ManyToOne((_type) => User, (user) => user.usersSourceSystems, { eager: false })
  @Exclude({ toPlainOnly: true })
  user:User;

  @ManyToOne((_type) => SourceSystem, (sourceSystem) => sourceSystem.usersSourceSystems, { eager: false })
  @Exclude({ toPlainOnly: true })
  sourceSystem:SourceSystem;
}
