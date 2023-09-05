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
  async create(@Body() createProducerDto: CreateProducerDto) {
    return this.producersService.create(createProducerDto);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  find(@Query('name') name?: string) {
    if (name) return this.producersService.findByName(name);
    return this.producersService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: IdParamDTO) {
    return this.producersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: IdParamDTO,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.producersService.update(id, updateProducerDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IdParamDTO) {
    return this.producersService.remove(id);
  }
}
