import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransferDto } from './dto/createTransfer.dto';
import { Transfer } from './transfer.entity';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
  constructor(private transferService: TransferService) {}
  @Post()
  createTransfer(@Body() createTransferDto: CreateTransferDto) {
    return this.transferService.createTransfer(createTransferDto);
  }
}
