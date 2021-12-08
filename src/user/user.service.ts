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
import { IreturnUser } from './user.types';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const uuidPass = uuid4().toString().split('-').slice(0, 1);
      const genPassword = uuidPass[0].toString();
      const bcryptPassword = bcrypt.hashSync(
        genPassword,
        bcrypt.genSaltSync(10),
      );
      const newUser = { ...dto, bcryptPassword };
      const user = await this.userRepository.create(newUser);
      const { password, ...data } = user;
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
      const data = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        is_blocked: user.is_blocked,
        created_at: user.created_at,
        token: ' ',
      };
      return data;
    });
    return rUsers;
  }

  async findOne({ email }: FindByEmailDto) {
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

  async findOneById(id: number): Promise<IreturnUser> {
    const user = await this.userRepository
      .createQueryBuilder('id')
      .where('user.id=:id', { id })
      .getOneOrFail()
      .catch((error) => {
        console.log('error', error);
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      });
    const { password, ...data } = user;
    return data;
  }

  async findForLogin({ email, password }: LoginUserDto): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email=:email', { email })
      .getOneOrFail()
      .catch((error) => {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        console.log(error.message);
      });
    if (user.password !== password) {
      return 'error';
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

  async blockUser(dto: BlockUserDto): Promise<IreturnUser> {
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

  async updateUser(dto: UpdateUserDto): Promise<IreturnUser> {
    try {
      const userData = await this.userRepository.findOne(dto.id);
      if (!userData) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      const updateUser = { ...userData, ...dto };
      const saveUpdateUser = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          id: updateUser.id,
          first_name: updateUser.first_name,
          last_name: updateUser.last_name,
          email: updateUser.email,
          password: updateUser.password,
          role: updateUser.role,
          is_blocked: updateUser.is_blocked,
        })
        .where('id = :id', { id: dto.id })
        .execute();

      const { password, ...data } = updateUser;
      return data;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findUserList(role): Promise<IreturnUser[]> {
    switch (role) {
      case 'hr':
        const hrUserList = await this.userRepository
          .createQueryBuilder('user')
          .where('user.role=:role', { role: 'employee' })
          .getMany()
          .catch((error) => {
            console.log('error', error);
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
          });
        const users = hrUserList.map((user) => {
          const data = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            is_blocked: user.is_blocked,
            created_at: user.created_at,
            token: ' ',
          };
          return data;
        });
        return users;

      case 'super_admin':
        const adminUserList = await this.userRepository
          .createQueryBuilder('user')
          .where('user.role IN (:...roles)', { roles: ['employee', 'hr'] })
          .getMany()
          .catch((error) => {
            console.log('error', error);
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
          });
        const usersAll = adminUserList.map((user) => {
          const data = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            is_blocked: user.is_blocked,
            created_at: user.created_at,
            token: ' ',
          };
          return data;
        });
        return usersAll;

      default:
        return hrUserList;
    }
  }
}
