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
} from '@nestjs/common';
import { User } from '../entities/user.entity';
// import { UpdateResult } from 'typeorm';
import {
  CreateUserDto,
  UpdateUserDto,
  LoginUserDto,
  BlockUserDto,
  UserDto,
} from './user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Get()
  // findOneById(@Param() id: number) {
  //   return this.userService.findOneById(id);
  // }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  // @Post('/login')
  // login(@Body() loginUserDto: LoginUserDto) {
  //   return UsersService.loginUser(loginUserDto);
  // }

  @Post('/block')
  blockUser(@Body() dto: BlockUserDto) {
    return this.userService.blockUser(dto);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return ' обновленный пользователь ';
  }
  @Get('/login')
  findForLogin(@Body() dto: LoginUserDto) {
    return this.userService.findForLogin(dto);
  }
  // @Get()
  // findOne(@Body() user: UserDto) {
  //   return this.userService.findOneByEmail(user.email);
  // }

  @Get()
  findAll() {
    return [
      { firstName: 'Buba', lastName: 'Umpa', email: 'poletslova@gmail.com' },
    ];
  }
}
