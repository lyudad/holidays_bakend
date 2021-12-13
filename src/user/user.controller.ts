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
import { IreturnUser, IloginData, ICreateUser } from './user.types';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  createUser(@Body() dto: CreateUserDto): Promise<void> {
    return this.userService.create(dto);
  }

  @Post('/block')
  blockUser(@Body() dto: BlockUserDto): Promise<IreturnUser> {
    return this.userService.blockUser(dto);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IreturnUser> {
    return this.userService.updateUser(updateUserDto);
  }
  @Post('/login')
  findForLogin(@Body() dto: LoginUserDto) {
    return this.userService.findForLogin(dto);
  }

  @Get()
  findAll(): Promise<IreturnUser[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOneById(@Param('id') id: number): Promise<IreturnUser> {
    return this.userService.findOneById(id);

    // findAll() {
    //   return [
    //     {firstName: 'Buba',lastName: 'Umpa',email: 'poletslova@gmail.com'},
    //   ];
    // }
  }
}
