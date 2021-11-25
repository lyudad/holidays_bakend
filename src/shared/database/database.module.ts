import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from 'src/user/user.repository';
import { DaysOffRepository } from 'src/daysOff/daysOff.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, DaysOffRepository])],
  exports: [TypeOrmModule.forFeature([UserRepository, DaysOffRepository])],
})
export class DatabaseModule {}
