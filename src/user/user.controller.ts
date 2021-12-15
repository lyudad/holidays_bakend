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
import { CreateUserDto, UpdateUserDto, BlockUserDto } from './user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IreturnUser, ICreateUser } from './user.types';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createUser(@Body() dto: CreateUserDto): Promise<void> {
    return this.userService.createUser(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/block')
  blockUser(@Body() dto: BlockUserDto): Promise<IreturnUser> {
    return this.userService.blockUser(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IreturnUser> {
    return this.userService.updateUser(updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<IreturnUser[]> {
    return this.userService.findAll();
  }
  // @UseGuards(JwtAuthGuard)
  @Post('/mail')
  postUser(@Body() dto: any): any {
    return this.userService.createPass(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOneById(@Param('id') id: number): Promise<IreturnUser> {
    return this.userService.findOneById(id);
  }
}
