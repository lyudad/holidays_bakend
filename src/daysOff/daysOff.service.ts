import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDaysOffDto } from './daysOff.dto';
import { DaysOff } from '../entities/daysOff.entity';
import { DaysOffRepository } from './daysOff.repository';

@Injectable()
export class DaysOffService {
  constructor(private daysOffRepository: DaysOffRepository) {}
  async create(dto: CreateDaysOffDto) {
    const reservation = await this.daysOffRepository.create(dto);
    return reservation;
  }

  async findAllUserDaysOffById(id: number) {
    const data = await this.daysOffRepository
      .createQueryBuilder('daysOff')
      .where('daysOff.user = :user', {
        user: id,
      })
      .getMany()
      .catch((err) => {
        console.log(err);
      });
    return data;
  }
}
