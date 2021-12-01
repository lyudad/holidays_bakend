import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UpdateResult } from 'typeorm';
import {
  CreateUserDto,
  UpdateUserDto,
  LoginUserDto,
  BlockUserDto,
  UserDto,
} from './user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { Role } from '../role/role.enum';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/block')
  blockUser(@Body() dto: BlockUserDto) {
    return this.userService.blockUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return ' обновленный пользователь ';
  }
  // @Post('/login')
  // findForLogin(@Body() dto: LoginUserDto) {
  //   return this.userService.findForLogin(dto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOneById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/daysOff/:id')
  findDaysOffByUser(@Body('id') id: number) {
    return this.userService.findDaysOffByUser(id);
  }
}
