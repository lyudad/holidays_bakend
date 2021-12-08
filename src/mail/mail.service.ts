import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPassword(user: any): Promise<any> {
    return this.mailerService.sendMail({
      to: `${user.email}`,
      from: 'zenbit_holidays@meta.ua',
      subject: 'Welcome to Holidays!',
      text: 'Use this password',
      html: `<b>Hello, ${user.firstName}, your new password: ${user.password}</b>`,
    });
  }
}
