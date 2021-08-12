import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionGroupsModule } from './transaction-groups/transaction-groups.module';

@Module({
  imports: [
    TransactionsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'auto',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TransactionGroupsModule,
  ],
})
export class AppModule {}
