import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDaysOffDto } from './daysOff.dto';
import { DaysOff } from '../entities/daysOff.entity';

@Injectable()
export class DaysOffService {
  constructor(
    @InjectRepository(DaysOff)
    private daysOffRepository: Repository<DaysOff>,
  ) {}
  async create(dto: CreateDaysOffDto) {
    const reservation = await this.daysOffRepository.create(dto);
    return reservation;
  }

  // async update(dto: CreateDaysOffDto) {

  // }
}
