import { UsersSourceSystem } from 'src/users-source-systems/users-source-system.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SourceSystem {
  @PrimaryColumn()
  source_system_name: string;

  @Column()
  token: string;

  @Column()
  is_disabled: boolean;

  @OneToMany((_type) => UsersSourceSystem, (usersSourceSystem) => usersSourceSystem.sourceSystem, { eager: true })
  usersSourceSystems: UsersSourceSystem[];
}
