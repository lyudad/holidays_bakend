import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IUserMail } from '../user/user.types';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPassword(user: IUserMail): Promise<void> {
    return this.mailerService.sendMail({
      to: `${user.email}`,
      from: 'zenbit_holidays@meta.ua',
      subject: 'Welcome to Holidays!',
      text: 'Use this password',
      html: `<b>Hello, ${user.first_name}, your new password: ${user.password}</b>`,
    });
  }
}
