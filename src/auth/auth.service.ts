import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { IreturnUser, IloginData, IreturnUserList } from '../user/user.types';
import { User, UserRole } from '../entities/user.entity';

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
  async getUserList(token: string): Promise<IreturnUserList[]> {
    const decoded = this.jwtService.verify(token);

    if (decoded.userRole === UserRole.EMPLOYEE) {
      return;
    }
    const users = await this.userService.findUserList(decoded.userRole);

    return users;
  }
}
