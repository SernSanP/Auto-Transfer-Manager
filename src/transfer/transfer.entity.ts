import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn('uuid')
  session_id: string;

  @Column()
  source_system_name: string;

  @Column()
  user_id: string;

  @Column()
  payer_id: string;

  @Column()
  payee_bank_abbr: string;

  @Column()
  payee_bank_account: string;

  @Column()
  amount: number;

  @Column()
  payee_name: string;
}
