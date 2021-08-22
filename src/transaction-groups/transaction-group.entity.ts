import { Transaction } from 'src/transactions/transaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TransactionGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  is_running: boolean;

//   @OneToMany(
//     () => Transaction,
//     transaction => transaction.transactiongroup,
//   )
//   @JoinColumn({ name: 'id' })
//   transaction: Transaction[];
}
