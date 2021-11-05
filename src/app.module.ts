import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const {
  DB_PORT = 3306,
  DB_HOST = 'localhost',
  DB_USERNAME = 'root',
  DB_PASSWORD = 'root',
  DATABASE = 'vacation',
  NODE_ENV = 'development',
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DATABASE,
      entities: [],
      synchronize: NODE_ENV === 'production' ? false : true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
