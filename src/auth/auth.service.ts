import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    // find if user password match
    // const match = await this.comparePassword(pass, user.password);
    // if (!match) {
    //   return null;
    // }
    return null;
  }

  // public async login(user) {
  //   const token = await this.generateToken(user);
  //   return { user, token };
  // }

  // public async create(user) {
  //   // hash the password
  //   const pass = await this.hashPassword(user.password);

  //   // create the user
  //   const newUser = await this.userService.create({ ...user, password: pass });

  //   // tslint:disable-next-line: no-string-literal
  //   const { password, ...result } = newUser['dataValues'];

  //   // generate token
  //   const token = await this.generateToken(result);

  //   // return the user and the token
  //   return { user: result, token };
  // }

  // private async generateToken(user) {
  //   const token = await this.jwtService.signAsync(user);
  //   return token;
  // }

  // private async hashPassword(password) {
  //   const hash = await bcrypt.hash(password, 10);
  //   return hash;
  // }

  // private async comparePassword(enteredPassword, dbPassword) {
  //   const match = await bcrypt.compare(enteredPassword, dbPassword);
  //   return match;
  // }
}