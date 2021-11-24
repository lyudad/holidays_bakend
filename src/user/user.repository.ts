import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { User } from 'src/entities/User.entity';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
