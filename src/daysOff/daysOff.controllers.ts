import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CreateDaysOffDto, UpdateDaysOffDto } from './daysOff.dto';
import { DaysOffService } from './daysOff.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('daysOff')
export class DaysOffController {
  constructor(private daysOffService: DaysOffService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createDaysOff(@Body() createDaysOffDto: CreateDaysOffDto) {
    return 'создание записи о dayOff от employee';
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findAllUserDaysOffById(@Param('id') id: number): Promise<any> {
    return this.daysOffService.findAllUserDaysOffById(id);
  }
}
