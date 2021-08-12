import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTransactionGroupDto } from './dto/createTransactionGroup.dto';
import { UpdateTransactionGroupDto } from './dto/updateTransactionGroup.dto';
import { TransactionGroup } from './transaction-group.entity';
import { TransactionGroupsService } from './transaction-groups.service';

@Controller('transaction-groups')
export class TransactionGroupsController {
  constructor(private transactionGroupsService: TransactionGroupsService) {}

  @Post()
  createTransactionGroup(
    @Body() createTransactionGroupDto: CreateTransactionGroupDto,
  ): Promise<TransactionGroup> {
    return this.transactionGroupsService.createTransactionGroup(
      createTransactionGroupDto,
    );
  }

  @Get('/:id')
  getTransactionGroupById(@Param('id') id: string): Promise<TransactionGroup> {
    return this.transactionGroupsService.getTransactionGroupById(id);
  }

  @Get()
  getTransactionGroups(): Promise<TransactionGroup[]> {
    return this.transactionGroupsService.getTransactionGroups();
  }

  @Patch('/:id')
  updateTransactionGroup(
    @Param('id') id: string,
    @Body() updateTransactionGroupDto: UpdateTransactionGroupDto,
  ): Promise<TransactionGroup> {
    return this.transactionGroupsService.updateTransactionGroup(
      updateTransactionGroupDto,
      id,
    );
  }

  @Delete('/:id')
  deleteTransactionGroup(@Param('id') id: string): Promise<void> {
    return this.transactionGroupsService.deleteTransactionGroup(id);
  }
}
