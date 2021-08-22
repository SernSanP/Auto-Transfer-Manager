import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TransactionGroupsModule } from 'src/transaction-groups/transaction-groups.module';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { UsersModule } from 'src/users/users.module';
import { PayersModule } from 'src/payers/payers.module';

@Module({
  imports: [
    TransactionGroupsModule,
    TransactionsModule,
    UsersModule,
    PayersModule,
  ],
  providers: [TransferService],
  controllers: [TransferController],
})
export class TransferModule {}
