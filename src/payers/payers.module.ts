import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayersController } from './payers.controller';
import { PayersRepository } from './payers.repository';
import { PayersService } from './payers.service';

@Module({
  imports: [TypeOrmModule.forFeature([PayersRepository])],
  controllers: [PayersController],
  providers: [PayersService],
})
export class PayersModule {}
