import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { getBankFromAbbr } from 'src/transfer/bank';
import { CreatePayerDto } from './dto/createPayer.dto';
import { UpdatePayerDto } from './dto/updatePayer.dto';
import { Payer } from './payer.entity';
import { PayersService } from './payers.service';

@Controller('payers')
export class PayersController {
  constructor(private payersService: PayersService) { }

  @Post()
  createPayer(@Body() createPayerDto: CreatePayerDto): Promise<Payer> {
    const { payer_bank_abbr } = createPayerDto;
    const res = getBankFromAbbr(payer_bank_abbr);
    if (!res) {
      throw new NotFoundException();
    }
    return this.payersService.createPayer(createPayerDto);
  }

  @Get('/:id')
  getPayerById(@Param('id') id: string): Promise<Payer> {
    return this.payersService.getPayerById(id);
  }

  @Get()
  getPayers(): Promise<Payer[]> {
    return this.payersService.getPayers();
  }

  @Patch('/:id')
  updatePayer(
    @Param('id') id: string,
    @Body() updatePayerDto: UpdatePayerDto,
  ): Promise<Payer> {
    console.log(updatePayerDto)
    return this.payersService.updatePayer(updatePayerDto, id);
  }

  // @Patch('/:id')
  // updatePayer(
  //   @Param('id') id: string,
  //   @Body() updatePayerDto: any,
  // ): Promise<Payer> {
  //   console.log(updatePayerDto)
  //   return null;
  // }

  @Delete('/:id')
  deletePayer(@Param('id') id: string): Promise<void> {
    return this.payersService.deletePayer(id);
  }
}
