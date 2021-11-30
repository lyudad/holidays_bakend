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
import { UpdateResult } from 'typeorm';
import {
  CreateUserDto,
  UpdateUserDto,
  LoginUserDto,
  BlockUserDto,
  UserDto,
} from './user.dto';
import { UserService } from './user.service';
// import { Roles } from '../role/roles.decorator';
// import { Role } from '../role/role.enum';

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

  @Post('/block')
  blockUser(@Body() dto: BlockUserDto) {
    return this.userService.blockUser(dto);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return ' обновленный пользователь ';
  }
  @Post('/login')
  findForLogin(@Body() dto: LoginUserDto) {
    return this.userService.findForLogin(dto);
  }

  @Get()
  findAll() {
    return 'все позователи';
  }
}
