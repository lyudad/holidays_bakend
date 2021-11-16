/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { User } from 'user/user.entity';

export enum daysOffType {
  VACATION = 'vacation',
  SICK_LEAVE = 'sick_leave',
}

export enum statusType {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class DaysOff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: number;

  @Column()
  start_day: Date;

  @Column()
  end_day: Date;

  @Column({
    type: "enum",
    enum: daysOffType,
    default: daysOffType.VACATION,
  })
  type: daysOffType;

  @Column({
    type: "enum",
    enum: statusType,
    defaultValue: statusType.PENDING,
  })
  status: statusType;
}
