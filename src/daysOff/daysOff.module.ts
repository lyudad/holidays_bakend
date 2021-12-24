import { Module } from '@nestjs/common';
import { DaysOffService } from './daysOff.service';
import { DaysOffController } from './daysOff.controllers';
import { DatabaseModule } from 'src/shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DaysOffController],
  providers: [DaysOffService],
  exports: [DaysOffService],
})
export class DaysOffModule {}
