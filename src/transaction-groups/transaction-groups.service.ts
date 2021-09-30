import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionGroupDto } from './dto/createTransactionGroup.dto';
import { UpdateTransactionGroupDto } from './dto/updateTransactionGroup.dto';
import { TransactionGroup } from './transaction-group.entity';
import { TransactionGroupsRepository } from './transaction-groups.repository';

@Injectable()
export class TransactionGroupsService {
  constructor(
    @InjectRepository(TransactionGroupsRepository)
    private transactionGroupsRepository: TransactionGroupsRepository,
  ) {}

  createTransactionGroup(
    createTransactionGroupDto: CreateTransactionGroupDto,
  ): Promise<TransactionGroup> {
    return this.transactionGroupsRepository.createTransactionGroup(
      createTransactionGroupDto,
    );
  }

  getTransactionGroupById(id: string): Promise<TransactionGroup> {
    return this.transactionGroupsRepository.findOneOrFail(id);
  }

  getTransactionGroups(): Promise<TransactionGroup[]> {
    return this.transactionGroupsRepository.find({
      relations: ['transaction'],
    });
  }

  async updateTransactionGroup(
    updateTransactionGroupDto: UpdateTransactionGroupDto,
    id: string,
  ): Promise<TransactionGroup> {
    const transactiongroup =
      await this.transactionGroupsRepository.findOneOrFail(id);
    const { is_running, begin_transfered_at, end_transfered_at } =
      updateTransactionGroupDto;
    console.log('is_running',is_running)
    console.log('begin_transfered_at',begin_transfered_at)
    console.log('end_transfered_at',end_transfered_at)

    if (is_running !== null && is_running !== undefined) {
      transactiongroup.is_running = is_running;
    }
    if (begin_transfered_at !== null && begin_transfered_at !== undefined) {
      transactiongroup.begin_tranferred_at = begin_transfered_at;
    }
    if (end_transfered_at !== null && end_transfered_at !== undefined) {
      transactiongroup.end_tranferred_at = end_transfered_at;
    }
    await this.transactionGroupsRepository.update(id, transactiongroup);
    return transactiongroup;
  }

  async deleteTransactionGroup(id: string): Promise<void> {
    await this.transactionGroupsRepository.delete(id);
  }
}
