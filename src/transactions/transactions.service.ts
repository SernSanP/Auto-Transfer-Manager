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
    return this.transactionsRepository.find();
  }

  async updateTransaction(
    updateTransactionDto: UpdateTransactionDto,
    id: string,
  ): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOneOrFail(id);
    const { transaction_group_id } = updateTransactionDto;
    transaction.transaction_group_id = transaction_group_id;
    await this.transactionsRepository.update(id, transaction);
    return transaction;
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.transactionsRepository.delete(id);
  }
}
