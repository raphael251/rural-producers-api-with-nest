import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BusinessErrorInterceptor } from './business-error.interceptor';

@ApiTags('producers')
@Controller('producers')
@UseInterceptors(BusinessErrorInterceptor)
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
  findOne(@Param('id') id: string) {
    return this.producersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.producersService.update(id, updateProducerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.producersService.remove(+id);
  }
}
