import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';
// import { DaysOff } from './daysOff.entity';

export enum UserRole {
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

@Table
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Default({ value: 'employee' })
  @Column({
    type: DataType.STRING,
    values: ['employee', 'admin', 'super_admin'],
    allowNull: false,
  })
  role: string;

  @Default({ value: false })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_blocked: boolean;

  // @Column({ type: DataType.DATE })
  // created_at: string;
}
// @OneToMany(() => DaysOff, (daysOff) => daysOff.user)
// daysOff: DaysOff[];
