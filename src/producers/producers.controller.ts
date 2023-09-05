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
@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @UseGuards(AuthGuard)
  @Get('/dashboard')
  async dashboard() {
    return this.producersService.getDashboardData();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createProducerDto: CreateProducerDto) {
    return this.producersService.create(createProducerDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiQuery({ name: 'name', required: false })
  find(@Query('name') name?: string) {
    if (name) return this.producersService.findByName(name);
    return this.producersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param() { id }: IdParamDTO) {
    return this.producersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param() { id }: IdParamDTO,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.producersService.update(id, updateProducerDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param() { id }: IdParamDTO) {
    return this.producersService.remove(id);
  }
}
