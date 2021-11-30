import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { DaysOff } from 'src/entities/daysOff.entity';

@EntityRepository(DaysOff)
export class DaysOffRepository extends BaseRepository<DaysOff> {}
