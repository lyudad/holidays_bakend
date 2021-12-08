import * as dotenv from 'dotenv';
dotenv.config();
import { User } from '../entities/user.entity';

const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;
console.log(DB_USERNAME);

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3030,
  database: {
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [User],
    synchronize: true,
    // synchronize: NODE_ENV === 'production' ? false : true,
  },
});
