import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { IdParamDTO } from './dto/id-param.dto';
import { ProducerDto } from './dto/producer.dto';
import { producerDtoMapper } from './utils/producer-dto.mapper';

@ApiTags('producers')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Get('/dashboard')
  async dashboard() {
    return this.producersService.getDashboardData();
  }

  @Post()
  async create(
    @Body() createProducerDto: CreateProducerDto,
  ): Promise<ProducerDto> {
    const producer = await this.producersService.create(createProducerDto);

    return producerDtoMapper(producer);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  async findAll(@Query('name') name?: string): Promise<Array<ProducerDto>> {
    if (name) {
      const producers = await this.producersService.findByName(name);
      return producers.map(producerDtoMapper);
    }

    const producers = await this.producersService.findAll();
    return producers.map(producerDtoMapper);
  }

  @Get(':id')
  async findOne(@Param() { id }: IdParamDTO): Promise<ProducerDto> {
    const producer = await this.producersService.findOne(id);
    return producerDtoMapper(producer);
  }

  @Patch(':id')
  async update(
    @Param() { id }: IdParamDTO,
    @Body() updateProducerDto: UpdateProducerDto,
  ): Promise<ProducerDto> {
    const producer = await this.producersService.update(id, updateProducerDto);
    return producerDtoMapper(producer);
  }

  @Delete(':id')
  remove(@Param() { id }: IdParamDTO): Promise<void> {
    return this.producersService.deleteOneById(id);
  }
}
