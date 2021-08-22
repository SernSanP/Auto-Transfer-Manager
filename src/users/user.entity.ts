import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersSourceSystem } from 'src/users-source-systems/users-source-system.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  is_admin: boolean;

  @Column()
  is_blocked: boolean;

  // @OneToMany(
  //   (_type) => UsersSourceSystem,
  //   (usersSourceSystem) => usersSourceSystem.user,
  // )
  // users: UsersSourceSystem[];

  // @OneToMany(
  //   (_type) => UsersSourceSystem,
  //   (usersSourceSystem) => usersSourceSystem.createdUser,
  // )
  // createdUsers: UsersSourceSystem[];
}
