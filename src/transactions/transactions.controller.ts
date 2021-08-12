import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { UpdateTransactionDto } from './dto/updateTransaction.dto';
import { Transaction } from './transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Get('/:id')
  getTransactionById(@Param('id') id: string): Promise<Transaction> {
    return this.transactionsService.getTransactionById(id);
  }

  @Get()
  getTransactionGroups(): Promise<Transaction[]> {
    return this.transactionsService.getTransactions();
  }

  @Patch('/:id')
  updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.updateTransaction(
      updateTransactionDto,
      id,
    );
  }

  @Delete('/:id')
  deleteTransaction(@Param('id') id: string): Promise<void> {
    return this.transactionsService.deleteTransaction(id);
  }
}
