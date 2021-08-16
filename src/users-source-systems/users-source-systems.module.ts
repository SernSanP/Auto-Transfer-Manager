import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSourceSystemsRepository } from './users-source-systems.repository';
import { UsersSourceSystemsController } from './users-source-systems.controller';
import { UsersSourceSystemsService } from './users-source-systems.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersSourceSystemsRepository]),
    AuthModule,
  ],
  controllers: [UsersSourceSystemsController],
  providers: [UsersSourceSystemsService],
})
export class UsersSourceSystemsModule {}
