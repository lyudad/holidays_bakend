import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UsersModule } from './user/user.module';
import * as dotenv from 'dotenv';
dotenv.config();

const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DATABASE, NODE_ENV } =
  process.env;
console.log(DB_USERNAME);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DATABASE,
      entities: [User],
      synchronize: NODE_ENV === 'production' ? false : true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
