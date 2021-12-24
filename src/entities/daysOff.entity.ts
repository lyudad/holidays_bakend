import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

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
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  start_day: Date;

  @Column()
  end_day: Date;

  @Column({
    type: 'enum',
    enum: daysOffType,
    default: daysOffType.VACATION,
  })
  type: daysOffType;

  @Column({
    type: 'enum',
    enum: statusType,
    default: statusType.PENDING,
  })
  status: statusType;
  @Column()
  userId: string;
}
