import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { UserRole } from './user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @IsEmail()
  readonly email: string;

  @IsUUID()
  @IsString()
  readonly password: string;

  @IsEnum({
    enum: UserRole,
    enumName: 'UserRole',
  })
  readonly role!: UserRole;

  @IsBoolean()
  readonly is_blocked: boolean;

  @IsDate()
  readonly created_at: Date;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class UpdateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsBoolean()
  is_blocked: boolean;
}
