import { Transaction } from 'src/transactions/transaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  created_user_id: string;

  @Column()
  payer_name: string;

  @Column()
  source_system_name: string;

  @Column()
  payer_bank_abbr: string;

  @Column()
  payer_bank_account: string;

  @Column()
  payer_msisdn: string;

  @Column()
  is_disabled: boolean;

  @OneToMany(
    () => Transaction,
    Transaction => Transaction.payer,
  )
  @JoinColumn({ name: 'id' })
  transaction: Transaction;
}
