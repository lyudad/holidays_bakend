// import { Injectable } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
// @Injectable()
// export class AppService {
//   getListUsers(): string {
//     return 'All users are here';
//   }

//   postListUsers(): string {
//     return 'All POST users are here';
//   }
// }
