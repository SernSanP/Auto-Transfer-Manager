import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersSourceSystemsModule } from './users-source-systems/users-source-systems.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionGroupsModule } from './transaction-groups/transaction-groups.module';
import { PayersModule } from './payers/payers.module';
import { SourceSystemsModule } from './source-systems/source-systems.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'auto-tranfer-manager',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    UsersSourceSystemsModule,
    SourceSystemsModule,
    AuthModule,
    TransactionGroupsModule,
    PayersModule,
    TransactionsModule,
  ],
})
export class AppModule {}
