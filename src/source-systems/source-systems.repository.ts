import { EntityRepository, Repository } from 'typeorm';
import { CreateSourceSystemDto } from './dto/create-source-system.dto';
import { GetSourceSystemsFilterDto } from './dto/get-source-systems-filter';
import { SourceSystem } from './source-system.entity';

@EntityRepository(SourceSystem)
export class SourceSystemsRepository extends Repository<SourceSystem> {
  async getSourceSystems(
    filterDto: GetSourceSystemsFilterDto,
  ): Promise<SourceSystem[]> {
    const { token, is_disabled } = filterDto;
    const query = this.createQueryBuilder('user');
    if (token) {
      query.andWhere('sourceSystem.token = :sourceSystem', { token });
    }
    if (is_disabled) {
      query.andWhere('sourceSystem.is_disabled = :is_disabled', {
        is_disabled,
      });
    }
    const SourceSystems = await query.getMany();
    return SourceSystems;
  }

  async createSourceSystem(
    createSourceSystemDto: CreateSourceSystemDto,
  ): Promise<SourceSystem> {
    const { source_system_name, token } = createSourceSystemDto;
    const sourceSystem = this.create({
      source_system_name,
      token,
      is_disabled: false,
    });
    await this.save(sourceSystem);
    return sourceSystem;
  }
}
