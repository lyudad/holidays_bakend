import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UsersModule } from './user/user.module';
// import * as dotenv from 'dotenv';
// dotenv.config();

// const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DATABASE, NODE_ENV } =
//   process.env;
// console.log(DB_USERNAME);

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
