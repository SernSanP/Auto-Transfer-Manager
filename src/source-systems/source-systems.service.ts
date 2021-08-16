import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSourceSystemDto } from './dto/create-source-system.dto';
import { GetSourceSystemsFilterDto } from './dto/get-source-systems-filter';
import { UpdateSourceSystemInfoDto } from './dto/update-source-system-info.dto';
import { SourceSystem } from './source-system.entity';
import { SourceSystemsRepository } from './source-systems.repository';

@Injectable()
export class SourceSystemsService {
  constructor(
    @InjectRepository(SourceSystemsRepository)
    private sourceSystemsRepository: SourceSystemsRepository,
  ) {}

  getSourceSystems(getSourceSystemsFilterDto: GetSourceSystemsFilterDto): Promise<SourceSystem[]> {
    return this.sourceSystemsRepository.getSourceSystems(getSourceSystemsFilterDto);
  }

  async getSourceSystemByName(source_system_name: string): Promise<SourceSystem> {
    const found = await this.sourceSystemsRepository.findOne(source_system_name);
    if (!found) {
      throw new NotFoundException(`Source system ${source_system_name} not found`);
    }
    return found;
  }

  async blockSourceSystem(source_system_name: string): Promise<SourceSystem> {
    const sourceSystem = await this.getSourceSystemByName(source_system_name);
    sourceSystem.is_disabled = true;
    await this.sourceSystemsRepository.save(sourceSystem);
    return sourceSystem;
  }

  async createSourceSystem(createSourceSystemDto: CreateSourceSystemDto): Promise<SourceSystem> {
    return this.sourceSystemsRepository.createSourceSystem(createSourceSystemDto);
  }

  async updateSourceSystemInfo(source_system_name:string, updateSourceSystemInfoDto: UpdateSourceSystemInfoDto): Promise<SourceSystem>{
    const { token, is_disabled } = updateSourceSystemInfoDto
    const sourceSystem = await this.getSourceSystemByName(source_system_name);
    sourceSystem.token = token;
    sourceSystem.is_disabled = is_disabled;
    await this.sourceSystemsRepository.save(sourceSystem);
    return sourceSystem;
  }
}
