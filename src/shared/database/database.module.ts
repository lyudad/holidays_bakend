import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from 'src/user/user.repository';
import { DaysOffRepository } from 'src/daysOff/daysOff.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([DaysOffRepository]),
  ],
  exports: [
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([DaysOffRepository]),
  ],
})
export class DatabaseModule {}
