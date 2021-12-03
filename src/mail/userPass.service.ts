import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { UserMail } from 'src/entities/user.entity';
import { CreatePasswordDto } from './mail.dto';
import { MailService } from './mail.service';

@Injectable()
export class CreatePassService {
  constructor(private mailService: MailService) {}

  async createPass(dto: CreatePasswordDto): Promise<UserMail> {
    const uuidPass = uuidv4().toString().split('-').slice(0, 1);
    const genPassword = uuidPass[0].toString();
    const user = {
      ...dto,
      password: genPassword,
    };
    await this.mailService.sendPassword(user);
    return user;
  }
}
