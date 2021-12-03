import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePassService } from './userPass.service';

@Controller('/mail')
export class MailController {
  constructor(private readonly createService: CreatePassService) {}
  @Get('/all')
  getUser() {
    return this.createService.getUser();
  }

  @Post()
  postUser(@Body() dto: any) {
    console.log(dto);
    return this.createService.createPass(dto);
  }
}
