import { EntityRepository, Repository } from 'typeorm';
import { CreateTransactionGroupDto } from './dto/createTransactionGroup.dto';
import { TransactionGroup } from './transaction-group.entity';

@EntityRepository(TransactionGroup)
export class TransactionGroupsRepository extends Repository<TransactionGroup> {
  async createTransactionGroup(
    createTransactionGroupDto: CreateTransactionGroupDto,
  ): Promise<TransactionGroup> {
    const {} = createTransactionGroupDto;
    const transactiongroup = this.create({
      is_running: false,
    });
    await this.save(transactiongroup);
    return transactiongroup;
  }
}
