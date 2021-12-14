import ShortUniqueId from 'short-unique-id';
import { Injectable } from '@nestjs/common';
import { CreatePasswordDto } from './mail.dto';
import { MailService } from './mail.service';
import { IUserMail } from '../user/user.types';

@Injectable()
export class CreatePassService {
  constructor(private mailService: MailService) {}

  async createPass(dto: CreatePasswordDto): Promise<IUserMail> {
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
