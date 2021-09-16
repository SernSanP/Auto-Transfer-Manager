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
  @ManyToOne((_type) => User, (user) => user.users, { eager: false })
  @JoinColumn({ name: 'userId' ,referencedColumnName: 'id'})
  @Exclude({ toPlainOnly: true })
  user: User;

  @PrimaryColumn()
  source_system_name: string;
  @ManyToOne(
    (_type) => SourceSystem,
    (sourceSystem) => sourceSystem.sourceSystems,
    { eager: false },
  )
  @JoinColumn({ name: 'source_system_name' ,referencedColumnName: 'source_system_name'})
  @Exclude({ toPlainOnly: true })
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
