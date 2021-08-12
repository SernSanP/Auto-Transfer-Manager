import { Transaction } from 'src/transactions/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TransactionGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  is_running: string;

  // @OneToMany(
  //   _type => Transaction,
  //   Transaction => Transaction.transactiongroup,
  //   { eager: true },
  // )
  transaction: Transaction[];
}
