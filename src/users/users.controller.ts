/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
// import { UsersService } from './users.service;

@Controller('users')
export class UsersController {
  // constructor(private readonly usersService: UsersService) {}
  @Get('/users')
  getAll(): string {
    return 'get All!!!!';
  }
}
