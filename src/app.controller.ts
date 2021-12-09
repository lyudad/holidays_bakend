import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { IloginData, IreturnUser, IreturnUserList } from './user/user.types';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<IloginData> {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<IreturnUser> {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/list')
  async getUserList(@Request() req): Promise<IreturnUserList[]> {
    return this.authService.getUserList(req.body.token);
  }
}
