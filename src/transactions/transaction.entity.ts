import { Payer } from 'src/payers/payer.entity';
import { TransactionGroup } from 'src/transaction-groups/transaction-group.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transaction_group_id: string;

  @Generated("uuid")
  @Column()
  @Generated('uuid')
  session_id: string;

  @Column({ nullable: true })
  api_transaction_id: string;

  @Column()
  source_system_name: string;

  @Column()
  user_id: string;

  @Column()
  user_first_name: string;

  @Column()
  user_last_name: string;

  @Column({ nullable: true })
  payer_id: string;

  @Column({ nullable: true })
  payer_bank_abbr: string;

  @Column({ nullable: true })
  payer_bank_account: string;

  @Column({ nullable: true })
  payer_msisdn: string;

  @Column()
  payee_bank_abbr: string;

  @Column()
  payee_bank_account: string;

  @Column()
  amount: number;

  @Column({ nullable: true, type: 'float' }, )
  actual_amount: number;

  @Column()
  payee_name: string;

  @Column({ nullable: true })
  response_payee_name: string;

  @Column({ nullable: true })
  transferred_at: Date;

  @Column({ nullable: true })
  sms_verified_at: Date;

  @Column({ nullable: true })
  status_code: string;

  @Column({ nullable: true })
  status_type: string;

  @Column({ nullable: true })
  status_message: string;

  @Column()
  is_deleted: boolean;

  @Column()
  created_at: Date;

  @ManyToOne(
    () => TransactionGroup,
    (transactiongroup) => transactiongroup.transaction,
  )
  @JoinColumn({ name: 'transaction_group_id' })
  transactiongroup: TransactionGroup;

  @ManyToOne(() => Payer, (Payer) => Payer.transaction)
  @JoinColumn({ name: 'payer_id' })
  payer: Payer;

}
