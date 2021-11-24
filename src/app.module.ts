import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import configuration from './config/configuration';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './config/ormconfig';
@Module({
  // imports: [
  //   ConfigModule.forRoot({
  //     load: [configuration],
  //   }),
  //   UserModule,
  // ],
  imports: [TypeOrmModule.forRoot(ormconfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
