import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { IreturnUser, IloginData } from '../user/user.types';
import { User } from '../entities/user.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<IreturnUser> {
    const user = await this.userService.findOne({ email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<IloginData> {
    const payload = {
      username: user.first_name,
      sub: user.id,
      userRole: user.role,
    };
    if (user.is_blocked) {
      throw new HttpException(
        'user blocked, contact the administration',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      token: this.jwtService.sign(payload),
      id: user.id,
      first_name: user.first_name,
      role: user.role,
      is_blocked: user.is_blocked,
    };
  }
}
