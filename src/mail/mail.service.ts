import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // Отправляет PASSWORD на EMAIL юзера
  async sendPassword(user: any): Promise<any> {
    console.log(user, 'Check');
    return this.mailerService.sendMail({
      to: `${user.email}`,
      from: 'asgeir@meta.ua',
      subject: 'Welcome!',
      text: 'Use this password',
      html: `<b>${user.password}</b>`,
    });
  }
}
