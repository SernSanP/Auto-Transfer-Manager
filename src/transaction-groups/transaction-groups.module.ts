import { Module } from '@nestjs/common';
import { TransactionGroupsService } from './transaction-groups.service';
import { TransactionGroupsController } from './transaction-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionGroupsRepository } from './transaction-groups.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionGroupsRepository])],
  providers: [TransactionGroupsService],
  controllers: [TransactionGroupsController],
})
export class TransactionGroupsModule {}
