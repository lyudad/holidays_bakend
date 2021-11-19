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
import { User } from './user.entity';
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

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
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
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return ' обновленный пользователь ';
  }

  @Get()
  findOne(@Body() user: UserDto) {
    return this.userService.findOneByEmail(user.email);
  }

  @Get()
  findAll() {
    return 'все позователи';
  }
}
