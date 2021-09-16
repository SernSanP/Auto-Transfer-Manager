import { UsersSourceSystem } from 'src/users-source-systems/users-source-system.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SourceSystem {
  @PrimaryColumn()
  source_system_name: string;

  @Column()
  token: string;

  @Column()
  is_disabled: boolean;

  @OneToMany((_type) => UsersSourceSystem, (usersSourceSystem) => usersSourceSystem.sourceSystem)
  @JoinColumn({ name: 'source_system_name' })
  sourceSystems: UsersSourceSystem[];
}
