import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, Connection } from 'typeorm';
import ShortUniqueId from 'short-unique-id';
// import { EntityRepository } from 'typeorm';
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
import { IreturnUser, ICreateUser } from './user.types';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async checkUser(email: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email=:email', { email })
      .getOne()
      .catch((error) => {
        console.log('error', error);
      });
    return user;
  }

  async create(dto: CreateUserDto): Promise<void> {
    const user = await this.checkUser(dto.email);
    if (!user) {
      const uid = new ShortUniqueId();
      const genPassword = uid.stamp(10);
      const bcryptPassword = bcrypt.hashSync(
        genPassword,
        bcrypt.genSaltSync(10),
      );
      const newUser = this.userRepository.create({
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        password: genPassword,
        role: dto.role,
        is_blocked: dto.is_blocked,
      });
      await this.userRepository.save(newUser).catch((err) => {
        throw new HttpException('Unknown Error ', HttpStatus.BAD_REQUEST);
      });
      throw new HttpException('Created ', HttpStatus.CREATED);
    }
    throw new HttpException('Conflict', HttpStatus.CONFLICT);
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
      .where('id=:id', { id })
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
}
