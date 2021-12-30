import { Module } from '@nestjs/common';
import { DaysOffService } from './daysOff.service';
import { DaysOffController } from './daysOff.controllers';
import { DatabaseModule } from 'src/shared/database/database.module';
import { EmailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';
@Module({
  imports: [DatabaseModule, EmailModule, UserModule],
  controllers: [DaysOffController],
  providers: [DaysOffService],
  exports: [DaysOffService],
})
export class DaysOffModule {}
