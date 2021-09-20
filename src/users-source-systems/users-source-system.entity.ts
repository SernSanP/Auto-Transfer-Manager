import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../auth/roles/role.enum';
import { SourceSystem } from 'src/source-systems/source-system.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class UsersSourceSystem {
  @PrimaryColumn()
  userId: string;
  @ManyToOne((_type) => User, (user) => user.users,)
  @JoinColumn({ name: 'userId' ,referencedColumnName: 'id'})
  user: User;

  @PrimaryColumn()
  source_system_name: string;
  @ManyToOne(
    (_type) => SourceSystem,
    (sourceSystem) => sourceSystem.sourceSystems,
  )
  @JoinColumn({ name: 'source_system_name' ,referencedColumnName: 'source_system_name'})
  sourceSystem: SourceSystem;

  @Column()
  role: Role;

  @Column()
  limit_balance_per_transaction: number;

  @Column()
  limit_balance_per_day: number;

  @Column()
  is_blocked: boolean;
}