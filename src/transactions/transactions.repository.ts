import { EntityRepository, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { Transaction } from './transaction.entity';

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {
  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { transaction_group_id } = createTransactionDto;
    const transaction = this.create({
      transaction_group_id,
    });
    await this.save(transaction);
    return transaction;
  }
}
