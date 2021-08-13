import { Payer } from 'src/payers/payer.entity';
import { TransactionGroup } from 'src/transaction-groups/transaction-group.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transaction_group_id: string;

  // @Column()
  // session_id: string;

  // @Column()
  // api_transaction_id: string;

  // @Column()
  // source_system_name: string;

  // @Column()
  // user_id: string;

  // @Column()
  // user_first_name: string;

  // @Column()
  // user_last_name: string;

  // @Column()
  // payer_id: string;

  // @Column()
  // payer_bank_abbr: string;

  // @Column()
  // payer_bank_account: string;

  // @Column()
  // payer_msisdn: string;

  // @Column()
  // payee_bank_abbr: string;

  // @Column()
  // payee_bank_account: string;

  // @Column()
  // amount: string;

  // @Column()
  // actual_amount: string;

  // @Column()
  // payee_name: string;

  // @Column()
  // response_payee_name: string;

  // @Column()
  // transferred_at: string;

  // @Column()
  // sms_verified_at: string;

  // @Column()
  // status_code: string;

  // @Column()
  // status_type: string;

  // @Column()
  // status_message: string;

  // @Column()
  // is_deleted: string;

  // @ManyToOne(
  //   _type => TransactionGroup,
  //   TransactionGroup => TransactionGroup.transaction,
  //   { eager: false },
  // )
  transactiongroup: TransactionGroup;

  // @ManyToOne(
  //   _type => Payer,
  //   Payer => Payer.transaction,
  //   { eager: true },
  // )
  payer: Payer;
}
//this is a test
