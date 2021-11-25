import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDaysOffDto } from './daysOff.dto';
// import { DaysOff } from './daysOff.entity';

@Injectable()
export class DaysOffService {
  // constructor(
  //   @InjectRepository(DaysOff)
  //   private daysOffRepository: Repository<DaysOff>,
  // ) {}
  // async create(createDaysOffDto: CreateDaysOffDto) {
  //   const reservation = await this.daysOffRepository.create();
  //   return reservation;
  // }
}
