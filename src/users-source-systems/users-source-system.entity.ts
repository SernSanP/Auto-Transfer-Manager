import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Role } from '../Roles/role.enum';
import { SourceSystem } from 'src/source-systems/source-system.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class UsersSourceSystem {
  @PrimaryColumn()
  id: string;
  // @ManyToOne((_type) => User, (user) => user.users)
  // @JoinColumn({ name: 'id' })
  // @Exclude({toPlainOnly: true})
  // user: User;

  @PrimaryColumn()
  source_system_name: string;
  // @ManyToOne(
  //   (_type) => SourceSystem,
  //   (sourceSystem) => sourceSystem.sourceSystems,
  //   { eager: false },
  // )
  // @JoinColumn({ name: 'source_system_name' })
  // @Exclude({toPlainOnly: true})
  // sourceSystem: SourceSystem;

  @Column()
  created_user_id: string;
  // @ManyToOne((_type) => User, (user) => user.createdUsers, {
  //   eager: false,
  // })
  // @JoinColumn({ name: 'created_user_id' })
  // createdUser: User;

  @Column()
  role: Role;

  @Column()
  limit_balance_per_transaction: number;

  @Column()
  limit_balance_per_day: number;

  @Column()
  is_blocked: boolean;
}
