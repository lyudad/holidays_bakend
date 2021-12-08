import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

interface Ipayload {
  sub: number;
  username: string;
  userRole: string;
}

interface IValidate {
  userId: number;
  username: string;
  role: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: Ipayload): Promise<IValidate> {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.userRole,
    };
  }
}
