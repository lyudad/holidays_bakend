import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
