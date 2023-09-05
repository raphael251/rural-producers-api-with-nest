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
import { Producer } from './entities/producer.entity';

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
  ): Promise<Producer> {
    return this.producersService.create(createProducerDto);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  findAll(@Query('name') name?: string): Promise<Array<Producer>> {
    if (name) return this.producersService.findByName(name);
    return this.producersService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: IdParamDTO): Promise<Producer> {
    return this.producersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: IdParamDTO,
    @Body() updateProducerDto: UpdateProducerDto,
  ): Promise<Producer> {
    return this.producersService.update(id, updateProducerDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IdParamDTO): Promise<void> {
    return this.producersService.deleteOneById(id);
  }
}
