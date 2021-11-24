import { ConnectionOptions } from 'typeorm';
import { User } from '../user/user.entity';
import { DaysOff } from '../daysOff/daysOff.entity';

const config: ConnectionOptions = {
  type: 'mysql',
  host: '94.130.182.136',
  port: 3306,
  username: 'holiday',
  password: 'gY84jdvny7D',
  database: 'holiday',
  entities: [User, DaysOff],
  synchronize: true,
};

export default config;
