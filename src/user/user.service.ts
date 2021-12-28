import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import ShortUniqueId from 'short-unique-id';
import { UserRepository } from './user.repository';
import { User, UserRole } from 'src/entities/user.entity';
import {
  CreateUserDto,
  FindByEmailDto,
  UpdateUserDto,
  LoginUserDto,
  BlockUserDto,
  UpdateUserPassDto,
} from './user.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { IreturnUser, IreturnUserList } from './user.types';
import { MailService } from '../mail/mail.service';
import { IUserMail } from './user.types';
import { CreatePasswordDto } from 'src/mail/mail.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly mailService: MailService,
  ) {}

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

  async createUser(dto: CreateUserDto): Promise<void> {
    const user = await this.checkUser(dto.email);
    if (!user) {
      const uid = new ShortUniqueId();
      const genPassword = uid.stamp(10);
      console.log(genPassword);
      const saltOrRounds = 10;
      const hash = bcrypt.hashSync(genPassword, saltOrRounds);
      const userToMail: IUserMail = {
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        password: genPassword,
      };

      await this.mailService.sendPassword(userToMail);

      const newUser = this.userRepository.create({
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        password: hash,
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
      const { first_name, last_name, email } = updateUser;
      const saveUpdateUser = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          first_name,
          last_name,
          email,
        })
        .where('id = :id', { id: dto.id })
        .execute()
        .catch((error) => {
          console.log('error', error);
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        });
      const { password, ...data } = updateUser;
      return data;
    } catch (err: any) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
      console.log(err.message);
    }
  }

  async findUserList(role: string): Promise<IreturnUserList[]> {
    const returnList = () => {
      if (role === UserRole.SUPER_ADMIN) {
        return [UserRole.EMPLOYEE, UserRole.ADMIN];
      } else if (role === UserRole.ADMIN) {
        return [UserRole.EMPLOYEE];
      }
    };

    const adminUserList = await this.userRepository
      .createQueryBuilder('user')
      .where('user.role IN (:...roles)', {
        roles: returnList(),
      })
      .select('user.id')
      .addSelect('first_name')
      .addSelect('last_name')
      .addSelect('email')
      .addSelect('is_blocked')
      .getRawMany()
      .catch((error) => {
        console.log('error', error);
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      });
    return adminUserList;
  }
  async updatePassUser(dto: UpdateUserPassDto): Promise<IreturnUser> {
    const saltOrRounds = 10;
    const hash = bcrypt.hashSync(dto.password, saltOrRounds);

    try {
      const userData = await this.findOne(dto);
      if (!userData) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      const updateUser = { ...userData, ...{ password: hash } };
      await this.userRepository
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
        .where('email = :email', { email: dto.email })
        .execute();

      const { password, ...data } = updateUser;
      return data;
    } catch (e) {
      console.log(e.message);
    }
  }
  async createPass(dto: CreatePasswordDto): Promise<IUserMail> {
    const uid = new ShortUniqueId();
    const newPassword = uid.stamp(10);

    const user = {
      ...dto,
      password: newPassword,
    };
    await this.updatePassUser(user);
    await this.mailService.sendPassword(user);
    return user;
  }
  async deleteById(id: number): Promise<void> {
    try {
      const userData = await this.findOneById(id);
      if (!userData) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      await this.userRepository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id })
        .execute();
    } catch (e) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
      console.log(e.message);
    }
  }
  async toggleBlockUser(id: number): Promise<IreturnUser> {
    try {
      const user = await this.findOneById(id);
      if (!user) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      user.is_blocked = !user.is_blocked;
      const isBlock = user.is_blocked;
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          is_blocked: isBlock,
        })
        .where('id = :id', { id })
        .execute();
      return user;
    } catch (e) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
      console.log(e.message);
    }
  }
}
