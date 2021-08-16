import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { UpdateTransactionDto } from './dto/updateTransaction.dto';
import { Transaction } from './transaction.entity';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private transactionsRepository: TransactionsRepository,
  ) {}

  createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsRepository.createTransaction(createTransactionDto);
  }

  getTransactionById(id: string): Promise<Transaction> {
    return this.transactionsRepository.findOneOrFail(id);
  }

  getTransactions(): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      relations: ['transactiongroup', 'payer'],
    });
  }

  async updateTransaction(
    updateTransactionDto: UpdateTransactionDto,
    id: string,
  ): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOneOrFail(id);
    const {
      transaction_group_id,
      session_id,
      api_transaction_id,
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
      actual_amount,
      payee_name,
      response_payee_name,
      // transferred_at,
      // sms_verified_at,
      status_code,
      status_type,
      status_message,
      is_deleted,
    } = updateTransactionDto;
    transaction.transaction_group_id = transaction_group_id;
    transaction.session_id = session_id;
    transaction.api_transaction_id = api_transaction_id;
    transaction.source_system_name = source_system_name;
    transaction.user_id = user_id;
    transaction.user_first_name = user_first_name;
    transaction.user_last_name = user_last_name;
    transaction.payer_id = payer_id;
    transaction.payer_bank_abbr = payer_bank_abbr;
    transaction.payer_bank_account = payer_bank_account;
    transaction.payer_msisdn = payer_msisdn;
    transaction.payee_bank_abbr = payee_bank_abbr;
    transaction.payee_bank_account = payee_bank_account;
    transaction.amount = amount;
    transaction.actual_amount = actual_amount;
    transaction.payee_name = payee_name;
    transaction.response_payee_name = response_payee_name;
    // transaction.transferred_at = transferred_at;
    // transaction.sms_verified_at = sms_verified_at;
    transaction.status_code = status_code;
    transaction.status_type = status_type;
    transaction.status_message = status_message;
    transaction.is_deleted = is_deleted;
    await this.transactionsRepository.update(id, transaction);
    return transaction;
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.transactionsRepository.delete(id);
  }
}
