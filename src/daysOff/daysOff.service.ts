import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { IreturnUser } from '../user/user.types';
import { CreateDaysOffDto } from './daysOff.dto';
import { DaysOff } from '../entities/daysOff.entity';
import { DaysOffRepository } from './daysOff.repository';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { THrMailsList } from './daysOff.types';
@Injectable()
export class DaysOffService {
  constructor(
    private daysOffRepository: DaysOffRepository,
    private mailService: MailService,
    private userService: UserService,
  ) {}

  async checkDaysOff(userId, start_day) {
    const vacation = await this.daysOffRepository
      .createQueryBuilder('dayOff')
      .where('start_day = :start_day', { start_day })
      .andWhere('userId = :userId', { userId })
      .getOne()
      .catch((error) => {
        console.log('error', error);
      });
    console.log('vacation', vacation);
    return vacation;
  }
  async createDaysOff(dto: CreateDaysOffDto): Promise<DaysOff> {
    const userId: number = +dto.userId;
    const vacation = await this.checkDaysOff(userId, dto.start_day);
    if (!vacation) {
      const reservation = await this.daysOffRepository
        .save(dto)
        .catch((error) => {
          throw new HttpException('Unknown Error ', HttpStatus.BAD_REQUEST);
        });
      console.log(reservation);
      const hrMailList: THrMailsList = await this.userService.findHrMail();
      const user = await this.userService.findOneById(userId);
      const daysOffInfo = {
        first_name: user.first_name,
        last_name: user.last_name,
        start_day: dto.start_day,
        end_day: dto.end_day,
        type: dto.type,
      };
      await this.mailService.sendDaysOffMail(daysOffInfo, hrMailList);
      throw new HttpException('Created ', HttpStatus.CREATED);
    }

    throw new HttpException('Conflict', HttpStatus.CONFLICT);
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
