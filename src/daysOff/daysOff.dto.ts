import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsDate,
  IsBoolean,
} from 'class-validator';

import { daysOffType, statusType } from 'src/entities/daysOff.entity';

export class CreateDaysOffDto {
  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

  @IsNotEmpty()
  @IsDate()
  start_day: Date;

  @IsNotEmpty()
  @IsDate()
  end_day: Date;

  @IsEnum({
    enum: statusType,
    enumName: 'statusType',
  })
  readonly status: statusType;

  @IsEnum({
    enum: daysOffType,
    enumName: 'daysOffType',
  })
  readonly type: daysOffType;

  @IsDate()
  readonly created_at: Date;
}

export class UpdateDaysOffDto {
  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

  @IsNotEmpty()
  @IsDate()
  start_day: Date;

  @IsNotEmpty()
  @IsDate()
  end_day: Date;

  @IsEnum({
    enum: statusType,
    enumName: 'statusType',
  })
  readonly status: statusType;

  @IsEnum({
    enum: daysOffType,
    enumName: 'daysOffType',
  })
  readonly type: daysOffType;
}
