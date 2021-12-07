import ShortUniqueId from 'short-unique-id';
import { Injectable } from '@nestjs/common';
import { UserMail } from 'src/entities/user.entity';
import { CreatePasswordDto } from './mail.dto';
import { MailService } from './mail.service';

@Injectable()
export class CreatePassService {
  constructor(private mailService: MailService) {}

  async createPass(dto: CreatePasswordDto): Promise<UserMail> {
    const uid = new ShortUniqueId();
    const newPassword = uid.stamp(10);

    const user = {
      ...dto,
      password: newPassword,
    };
    await this.mailService.sendPassword(user);
    return user;
  }
}
