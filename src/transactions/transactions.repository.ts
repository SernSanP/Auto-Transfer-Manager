import { EntityRepository, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { Transaction } from './transaction.entity';

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {
  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const {
      transaction_group_id,
      session_id,
      source_system_name,
      user_id,
      user_first_name,
      user_last_name,
      payer_id,
      payer_bank_abbr,
      payer_bank_account,
      payer_msisdn,
      payee_bank_abbr,
      payee_bank_account,
      amount,
      payee_name,
    } = createTransactionDto;
    const transaction = this.create({
      transaction_group_id,
      session_id,
      source_system_name,
      user_id,
      user_first_name,
      user_last_name,
      payer_id,
      payer_bank_abbr,
      payer_bank_account,
      payer_msisdn,
      payee_bank_abbr,
      payee_bank_account,
      amount,
      payee_name,
      is_deleted: false,
    });
    await this.save(transaction);
    return transaction;
  }
}
