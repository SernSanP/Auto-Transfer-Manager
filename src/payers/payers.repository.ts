import { EntityRepository, Repository } from 'typeorm';
import { CreatePayerDto } from './dto/createPayer.dto';
import { Payer } from './payer.entity';

@EntityRepository(Payer)
export class PayersRepository extends Repository<Payer> {
  async createPayer(createPayerDto: CreatePayerDto): Promise<Payer> {
    const {
      created_user_id,
      source_system_name,
      payer_bank_abbr,
      payer_bank_account,
      payer_msisdn,
    } = createPayerDto;

    const payer = this.create({
      created_user_id,
      source_system_name,
      payer_bank_abbr,
      payer_bank_account,
      payer_msisdn,
      is_disabled: false,
    });
    await this.save(payer);
    return payer;
  }
}
