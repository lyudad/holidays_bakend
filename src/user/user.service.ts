import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { EntityRepository } from 'typeorm';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  LoginUserDto,
  BlockUserDto,
} from './user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const password = uuid4().toString();
      const newUser = { ...dto, password };
      const user = await this.userRepository.create(newUser);
      console.log(user);
      return user;
    } catch (e) {
      console.log(e.message);
    }
  }

  findAll(): Promise<User[]> {
    // const users = await this.userRepository.findAll({
    //   include: { all: true },
    // });
    // return users;
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  //   async findAll(): Promise<User> {
  //   const users = await this.userRepository.findAll({
  //     include: { all: true },
  //   });
  //   return users;
  // }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
        // include: { all: true },
      });
      return user;
    } catch (e) {
      console.log(e.message);
    }
  }

  // async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
  //   try {
  //     const Id = parseInt(id);
  //     const user = await this.userRepository.findOne({
  //       where: { id: Id },
  //     });
  //     if (!user) {
  //       throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  //     }
  //     return this.userRepository.updateOne({ where: { id: Id } }, dto);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // }

  async blockUser(dto: BlockUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne(dto.id);
      if (!user) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      user.is_blocked = true;
      return user;
    } catch (e) {
      console.log(e.message);
    }
  }

  async loginUser(dto: LoginUserDto) {
    const email = dto.email;
    const user = await await this.userRepository.findOne({
      where: { email: email },
      // include: { all: true },
    });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if (user.password === dto.password) {
      return user;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
