import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { EntityRepository } from 'typeorm';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import {
  CreateUserDto,
  FindByEmailDto,
  UpdateUserDto,
  LoginUserDto,
  BlockUserDto,
} from './user.dto';

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

import { IreturnUser, IloginData } from './user.types';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<IreturnUser> {
    try {
      const uuidPass = uuid4().toString().split('-').slice(0, 1);
      const genPassword = uuidPass[0].toString();
      // шифруем пароль перед сохранением в базе
      const pass = bcrypt.hashSync(genPassword, bcrypt.genSaltSync(10));
      // console.log(password);
      const newUser = { ...dto, pass };
      const user = await this.userRepository.create(newUser);
      const { password, ...data } = user;
      console.log(data);
      return user;
    } catch (e) {
      console.log(e.message);
    }
  }

  async findAll(): Promise<IreturnUser[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .getMany()
      .catch((error) => {
        console.log(error.message);
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      });
    const rUsers = users.map((user) => {
      const { password, ...data } = user;
      return data;
    });
    return rUsers;
  }

  async findOne({ email }: FindByEmailDto): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email=:email', { email })
      .getOneOrFail()
      .catch((error) => {
        console.log('error', error);
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      });
    return user;
  }

  async findForLogin({ email, password }: LoginUserDto): Promise<IloginData> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email=:email', { email })
      .getOneOrFail()
      .catch((error) => {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        console.log(error.message);
      });
    if (user.password !== password) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const payload = { id: user.id, name: user.first_name };
    const secret = 'secret word';
    const token = jwt.sign(payload, secret);
    const result = {
      id: user.id,
      first_name: user.first_name,
      role: user.role,
      is_blocked: user.is_blocked,
      token,
    };

    console.log(result);
    return result;
  }

  async findOneById(id: number): Promise<IreturnUser> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOneOrFail()
      .catch((error) => {
        console.log('error', error);
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      });
    const { password, ...data } = user;
    return data;
  }

  async blockUser(dto: BlockUserDto): Promise<IreturnUser> {
    try {
      const user = await this.userRepository.findOne(dto.id);
      if (!user) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      user.is_blocked = true;
      const { password, ...data } = user;
      return data;
    } catch (e) {
      console.log(e.message);
    }
  }
}
