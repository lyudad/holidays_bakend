import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DaysOff } from './daysOff.entity';

export enum UserRole {
  EMPLOYEE = 'employee',
  ADMIN = 'hr',
  SUPER_ADMIN = 'super_admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  role: UserRole;

  @Column({ default: false })
  is_blocked: boolean;

  @Column({ type: Date })
  created_at: Date;

  @Column({
    default: 'null',
  })
  token: string;

  @OneToMany(() => DaysOff, (daysOff) => daysOff.user)
  daysOff: DaysOff[];
}
