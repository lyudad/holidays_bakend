import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UserDto {
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

export class FindByEmailDto {
  @IsNotEmpty()
  readonly email: string;
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
  @IsNotEmpty()
  id: number;

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

export class BlockUserDto {
  @IsNotEmpty()
  id: string;

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
export class UpdateUserPassDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
