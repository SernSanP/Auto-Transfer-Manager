import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceSystemsRepository } from './source-systems.repository';
import { SourceSystemsController } from './source-systems.controller';
import { SourceSystemsService } from './source-systems.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SourceSystemsRepository]), AuthModule],
  controllers: [SourceSystemsController],
  providers: [SourceSystemsService],
})
export class SourceSystemsModule {}
