import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SourceSystemsService } from './source-systems.service';
import { SourceSystem } from './source-system.entity';
import { CreateSourceSystemDto } from './dto/create-source-system.dto';
import { GetSourceSystemsFilterDto } from './dto/get-source-systems-filter';
import { UpdateSourceSystemInfoDto } from './dto/update-source-system-info.dto';

@Controller('source-system')
export class SourceSystemsController {
  constructor(private SourceSystemsService: SourceSystemsService) {}
  @Get()
  getSourceSystems(@Query() filterDto: GetSourceSystemsFilterDto): Promise<SourceSystem[]> {
    return this.SourceSystemsService.getSourceSystems(filterDto);
  }

  @Get('/:source_system_name')
  getSourceSystemBysource_system_name(@Param('id') id: string): Promise<SourceSystem> {
    return this.SourceSystemsService.getSourceSystemByName(id);
  }

  @Post()
  createSourceSystems(@Body() createSourceSystemDto: CreateSourceSystemDto): Promise<SourceSystem> {
    return this.SourceSystemsService.createSourceSystem(createSourceSystemDto);
  }

  @Delete('/:source_system_name')
  blockSourceSystem(@Param('source_system_name') source_system_name: string): Promise<SourceSystem> {
    return this.SourceSystemsService.blockSourceSystem(source_system_name);
  }

  @Patch('/:source_system_name')
  updateSourceSystemInfo(
    @Param('source_system_name') source_system_name: string,
    @Body() updateSourceSystemInfoDto: UpdateSourceSystemInfoDto,
  ): Promise<SourceSystem> {
    return this.SourceSystemsService.updateSourceSystemInfo(source_system_name, updateSourceSystemInfoDto);
  }
}
