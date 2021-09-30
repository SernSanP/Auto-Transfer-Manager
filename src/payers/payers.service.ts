import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePayerDto } from './dto/createPayer.dto';
import { UpdatePayerDto } from './dto/updatePayer.dto';
import { Payer } from './payer.entity';
import { PayersRepository } from './payers.repository';

@Injectable()
export class PayersService {
  constructor(
    @InjectRepository(PayersRepository)
    private payersRepository: PayersRepository,
  ) { }

  createPayer(createPayerDto: CreatePayerDto): Promise<Payer> {
    return this.payersRepository.createPayer(createPayerDto);
  }

  getPayerById(id: string): Promise<Payer> {
    return this.payersRepository.findOneOrFail(id);
  }

  getPayers(): Promise<Payer[]> {
    return this.payersRepository.find();
  }

  async updatePayer(
    updatePayerDto: UpdatePayerDto,
    id: string,
  ): Promise<Payer> {
    const payer = await this.payersRepository.findOneOrFail(id);
    const {
      payer_name,
      payer_bank_abbr,
      payer_bank_account,
      payer_msisdn,
      is_disabled,
    } = updatePayerDto;
    payer.payer_name = payer_name
    payer.payer_bank_abbr = payer_bank_abbr;
    payer.payer_bank_account = payer_bank_account;
    payer.payer_msisdn = payer_msisdn;
    payer.is_disabled = is_disabled;
    await this.payersRepository.update(id, payer);
    return payer;
  }

  async deletePayer(id: string): Promise<void> {
    await this.payersRepository.delete(id);
  }
}
