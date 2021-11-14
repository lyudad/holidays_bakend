import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DATABASE, NODE_ENV } =
  process.env;

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    // }),
    // TypeOrmModule.forRoot({
    //     type: 'mysql',
    // host: DB_HOST,
    //     port: Number(DB_PORT),
    //     username: DB_USERNAME,
    //     password: DB_PASSWORD,
    // database: DATABASE,
    //     entities: [],
    //     synchronize: NODE_ENV === 'production' ? false : true,
    // }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
