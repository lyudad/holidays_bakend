/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAll(): string {
    return 'All users are here';
  }
}
