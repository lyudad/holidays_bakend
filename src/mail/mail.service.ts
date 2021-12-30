import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IUserMail } from '../user/user.types';
import { IDaysOffInfo, THrMailsList } from '../daysOff/daysOff.types';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPassword(user: IUserMail): Promise<void> {
    return this.mailerService.sendMail({
      to: `${user.email}`,
      from: process.env.MAIL_ID,
      subject: 'Welcome to Holidays!',
      text: 'Use this password',
      html: `<b>Hello, ${user.first_name}, your new password: ${user.password}</b>`,
    });
  }
  async sendDaysOffMail(
    daysOffInfo: IDaysOffInfo,
    hrMails: THrMailsList,
  ): Promise<void> {
    for (let i = 0; i <= hrMails.length; i++) {
      this.mailerService.sendMail({
        to: `${hrMails[i]}`,
        from: process.env.MAIL_ID,
        subject: 'Leave application',
        text: `leave negotiation request from ${daysOffInfo.first_name} ${daysOffInfo.last_name}`,
        html: `${daysOffInfo.first_name} ${daysOffInfo.last_name} requests to agree on leave type ${daysOffInfo.type} for dates ${daysOffInfo.start_day} ${daysOffInfo.end_day}`,
      });
    }
  }
}
