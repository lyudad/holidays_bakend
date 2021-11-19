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

@Controller('daysOff')
export class DaysOffController {
  // constructor(privat daysOffService: DaysOffService) {}
  @Post()
  async createDaysOff(@Body() createDaysOffDto: CreateDaysOffDto) {
    return 'создание записи о dayOff от employee';
  }
}
