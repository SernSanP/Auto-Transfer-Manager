import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UsersSourceSystem } from './users-source-system.entity';

@EntityRepository(UsersSourceSystem)
export class UsersSourceSystemsRepository extends Repository<UsersSourceSystem> {
  async getUsers(filterDto: GetUsersFilterDto): Promise<UsersSourceSystem[]> {
    const { search, role, is_blocked } = filterDto;
    const query = this.createQueryBuilder('user');
    if (role) {
      query.andWhere('user.role = :role', { role });
    }
    if (is_blocked) {
      query.andWhere('user.is_blocked = :is_blocked', { is_blocked });
    }
    if (search) {
      query.andWhere(
        'LOWER(user.email) Like :search OR LOWER(user.first_name) LIKE :search OR LOWER(user.last_name)',
        { search: `%${search}` },
      );
    }
    const users = await query.getMany();
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UsersSourceSystem> {
    const { source_system_name, role } = createUserDto;
    const user = this.create({
      source_system_name,
      role,
      limit_balance_per_transaction: 0,
      limit_balance_per_day: 0,
      is_blocked: false,
    });
    await this.save(user);
    return user;
  }
}
