import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CallTracker } from 'assert';
import { getBankFromAbbr } from './bank';
import { CreateTransferDto } from './dto/createTranfer.dto';
import { StartTransferDto } from './dto/startTransfer.dto';
import { Transfer } from './transfer.entity';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
  constructor(private transferService: TransferService) {}

  @Post('/create')
  createTransfer(@Body() createTransferDto: CreateTransferDto) {
    return this.transferService.createTransfer(createTransferDto);
  }
  
  @Post('/start')
  startTransfer(@Body() data: StartTransferDto): Promise<ServerResponse> {
    return this.transferService.startTransfer(data);
  }

  @Post('/test')
  testTransfer(@Body() data: any) {
    console.log(data);
  }
}

