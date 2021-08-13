import { Payer } from 'src/payers/payer.entity';
import { TransactionGroup } from 'src/transaction-groups/transaction-group.entity';
import {
  Column,
  Entity,
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

  @Column()
  session_id: string;

  @Column()
  api_transaction_id: string;

  @Column()
  source_system_name: string;

  @Column()
  user_id: number;

  @Column()
  user_first_name: string;

  @Column()
  user_last_name: string;

  @Column()
  payer_id: string;

  @Column()
  payer_bank_abbr: string;

  @Column()
  payer_bank_account: string;

  @Column()
  payer_msisdn: string;

  @Column()
  payee_bank_abbr: string;

  @Column()
  payee_bank_account: string;

  @Column()
  amount: number;

  @Column()
  actual_amount: number;

  @Column()
  payee_name: string;

  @Column()
  response_payee_name: string;

  // @Column()
  // transferred_at: Date;

  // @Column()
  // sms_verified_at: Date;

  @Column()
  status_code: string;

  @Column()
  status_type: string;

  @Column()
  status_message: string;

  @Column()
  is_deleted: boolean;

  @ManyToOne(
    () => TransactionGroup,
    transactiongroup => transactiongroup.transaction,
  )
  @JoinColumn({ name: 'transaction_group_id' })
  transactiongroup: TransactionGroup;

  @ManyToOne(
    () => Payer,
    Payer => Payer.transaction,
  )
  @JoinColumn({ name: 'payer_id' })
  payer: Payer;
}
//this is a test
