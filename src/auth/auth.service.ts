import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
// import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.first_name,
      sub: user.id,
      userRole: user.role,
    };
    if (user.is_blocked) {
      return 'user blocked, contact the administration';
    }
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      name: user.first_name,
      role: user.role,
      is_blocked: user.is_blocked,
    };
  }
}


