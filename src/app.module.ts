import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersSourceSystemsModule } from './users-source-systems/users-source-systems.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionGroupsModule } from './transaction-groups/transaction-groups.module';
import { PayersModule } from './payers/payers.module';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [
    UsersModule,
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
    UsersSourceSystemsModule,
    AuthModule,
    TransactionGroupsModule,
    PayersModule,
    TransactionsModule,
    TransferModule,
  ],
})
export class AppModule {}
