import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { UserMail } from 'src/entities/user.entity';

@EntityRepository(UserMail)
export class MailRepository extends BaseRepository<UserMail> {}
