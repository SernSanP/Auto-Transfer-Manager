import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { UpdateTransactionPayerDto } from './dto/updateTransaction_Payer.dto';
import { UpdateTransactionResponseDto } from './dto/updateTransaction_Response.dto';
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
    return this.transactionsRepository.find();
  }

  async updateTransaction_Payer(
    updateTransactionPayerDto: UpdateTransactionPayerDto,
    id: string,
  ): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOneOrFail(id);
    const { payer_id, payer_bank_abbr, payer_bank_account, payer_msisdn } =
      updateTransactionPayerDto;
    transaction.payer_id = payer_id;
    transaction.payer_bank_abbr = payer_bank_abbr;
    transaction.payer_bank_account = payer_bank_account;
    transaction.payer_msisdn = payer_msisdn;
    await this.transactionsRepository.update(id, transaction);
    return transaction;
  }

  async updateTransaction_Response(
    updateTransactionResponseDto: UpdateTransactionResponseDto,
    id: string,
  ): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOneOrFail(id);
    const { api_transaction_id, status_code, status_type, status_message } =
      updateTransactionResponseDto;
    transaction.api_transaction_id = api_transaction_id;
    transaction.status_code = status_code;
    transaction.status_type = status_type;
    transaction.status_message = status_message;
    await this.transactionsRepository.update(id, transaction);
    return transaction;
  }

  async updateTransactionCallback(
    updateTransactionCallbackDto: UpdateTransactionCallbackDto,
    api_transaction_id: string,
  ): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({
      where: { api_transaction_id },
    });
    const {
      actual_amount,
      response_payee_name,
      status_code,
      status_type,
      status_message,
    } = updateTransactionCallbackDto;
    transaction.actual_amount = actual_amount;
    transaction.response_payee_name = response_payee_name;
    transaction.status_code = status_code;
    transaction.status_type = status_type;
    transaction.status_message = status_message;
    await this.transactionsRepository.update(transaction.id, transaction);
    return transaction;
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.transactionsRepository.delete(id);
  }
}
