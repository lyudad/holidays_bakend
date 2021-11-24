import * as dotenv from 'dotenv';
dotenv.config();
import { User } from '../user/user.entity';

const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DATABASE, NODE_ENV } =
  process.env;
console.log(DB_USERNAME);

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3030,
  database: {
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    entities: [User],
    synchronize: NODE_ENV === 'production' ? false : true,
  },
});
