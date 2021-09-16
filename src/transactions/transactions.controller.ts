import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { UpdateTransactionPayerDto } from './dto/updateTransaction_Payer.dto';
import { UpdateTransactionResponseDto } from './dto/updateTransaction_Response.dto';
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
  getTransaction(): Promise<Transaction[]> {
    return this.transactionsService.getTransactions();
  }

  @Patch('/:id')
  updateTransaction_Payer(
    @Param('id') id: string,
    @Body() updateTransactionPayerDto: UpdateTransactionPayerDto,
  ): Promise<Transaction> {
    return this.transactionsService.updateTransaction_Payer(
      updateTransactionPayerDto,
      id,
    );
  }

  @Patch('/:id')
  updateTransaction_Response(
    @Param('id') id: string,
    @Body() updateTransactionResponseDto: UpdateTransactionResponseDto,
  ): Promise<Transaction> {
    return this.transactionsService.updateTransaction_Response(
      updateTransactionResponseDto,
      id,
    );
  }

  @Delete('/:id')
  deleteTransaction(@Param('id') id: string): Promise<void> {
    return this.transactionsService.deleteTransaction(id);
  }
}
