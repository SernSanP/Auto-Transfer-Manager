import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { getBankFromAbbr } from './bank';
import { StartTransferDto } from './dto/startTransfer.dto';
import { Transfer } from './transfer.entity';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
  constructor(private transferService: TransferService) {}

  @Post()
  createTransfer(
    @Body() data: any[],
    userID: string,
    source_system_name: string,
  ) {
    return this.transferService.createTransfer(
      data,
      userID,
      source_system_name,
    );
  }
  @Post()
  startTransfer(@Body() data: StartTransferDto): Promise<ServerResponse> {
    return this.transferService.startTransfer(data);
  }
}
