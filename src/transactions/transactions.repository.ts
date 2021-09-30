import { User } from 'src/users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { Transaction } from './transaction.entity';
import { GetTransactionsFilterDto } from './dto/getTransactionsFilter.dto';

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {
  async getTransactions(
    filterDto: GetTransactionsFilterDto,
    user: User,
  ): Promise<Transaction[]> {
    const { source_system_name, transaction_group_id } = filterDto;
    const query = this.createQueryBuilder('transactions');
    const { id: user_id } = user;
    query.where({ user_id });
    if (source_system_name) {
      query.andWhere(
        'transactions.source_system_name = :source_system_name',
        { source_system_name },
      );
    }
    if (transaction_group_id) {
      query.andWhere(
        'transactions.transaction_group_id = :transaction_group_id',
        { transaction_group_id },
      );
    }
    const transactions = await query.getMany();
    return transactions;
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const {
      transaction_group_id,
      source_system_name,
      user_id,
      user_first_name,
      user_last_name,
      payee_bank_abbr,
      payee_bank_account,
      amount,
      payee_name,
    } = createTransactionDto;
    const transaction = this.create({
      transaction_group_id,
      source_system_name,
      user_id,
      user_first_name,
      user_last_name,
      payee_bank_abbr,
      payee_bank_account,
      amount,
      payee_name,
      created_at: new Date,
      is_deleted: false,
    });
    await this.save(transaction);
    return transaction;
  }
}
