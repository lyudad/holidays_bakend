import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log(
          'configService.get<string>(',
          configService.get<string>('DB_DATABASE'),
          __dirname + '/entities/*.entity{.ts,.js}',
        );
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: 3306,
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DATABASE'),
          entities: [__dirname + '/entities/*.entity{.ts,.js}'],
          logging: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  // imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
