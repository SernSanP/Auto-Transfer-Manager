import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { getBankFromAbbr } from './bank';
import { CreateTransferDto } from './dto/createTransfer.dto';
import { Transfer } from './transfer.entity';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
  constructor(private transferService: TransferService) {}

  @Post()
  createTransfer(
    @Body() createTransferDto: CreateTransferDto,
  ): Promise<ServerResponse> {
    const { payee_bank_abbr } = createTransferDto;
    const res = getBankFromAbbr(payee_bank_abbr);
    if (!res) {
      throw new NotFoundException();
    }
    return this.transferService.createTransfer(createTransferDto);
  }
}
