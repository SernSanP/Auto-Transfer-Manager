import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-relation.decorator';
import { User } from 'src/users/user.entity';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { UpdateTransactionPayerDto } from './dto/updateTransaction_Payer.dto';
import { UpdateTransactionResponseDto } from './dto/updateTransaction_Response.dto';
import { Transaction } from './transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@UseGuards(AuthGuard())
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
  getTransaction(@GetUser() user:User,): Promise<Transaction[]> {
    return this.transactionsService.getTransactions(user);
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

