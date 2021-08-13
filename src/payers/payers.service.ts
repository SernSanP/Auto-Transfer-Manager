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
  ) {}

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
      created_user_id,
      source_system_name,
      payer_bank_abbr,
      payer_bank_account,
      payer_msisdn,
      is_disabled,
    } = updatePayerDto;
    payer.created_user_id = created_user_id;
    payer.source_system_name = source_system_name;
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
