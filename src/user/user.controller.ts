import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Post,
  UseGuards,
  Put,
} from '@nestjs/common';
// import { User } from './user.entity';
// import { UpdateResult } from 'typeorm';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return 'new user created';
  }
  async login(@Body() loginUserDto: LoginUserDto) {
    return 'login sucsses';
  }
  @Put('id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return `this action update a #${id} user`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this action return a #${id}user`;
  }
}
