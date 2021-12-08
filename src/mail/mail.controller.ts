import { Body, Controller, Post } from '@nestjs/common';
import { CreatePassService } from './userPass.service';

@Controller('/mail')
export class MailController {
  constructor(private readonly createService: CreatePassService) {}

  @Post()
  postUser(@Body() dto: any) {
    return this.createService.createPass(dto);
  }
}
