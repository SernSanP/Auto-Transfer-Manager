import { User } from 'src/users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserSourceSystemDto } from './dto/create-user-source-system-dto';
import { GetUsersSourceSystemFilterDto } from './dto/get-users-source-system-filter.dto';
import { UsersSourceSystem } from './users-source-system.entity';

@EntityRepository(UsersSourceSystem)
export class UsersSourceSystemsRepository extends Repository<UsersSourceSystem> {
  async getUsers(
    filterDto: GetUsersSourceSystemFilterDto,
    user: User,
  ): Promise<UsersSourceSystem[]> {
    const { search, role, is_blocked } = filterDto;
    const query = this.createQueryBuilder('user');
    query.where({ user });
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

  async createUser(
    createUserSourceSystemDto: CreateUserSourceSystemDto,
  ): Promise<UsersSourceSystem> {
    const { userId, source_system_name, role } = createUserSourceSystemDto;
    const new_user = this.create({
      userId,
      source_system_name,
      role,
      limit_balance_per_transaction: 0,
      limit_balance_per_day: 0,
      is_blocked: false,
    });
    await this.save(new_user);
    return new_user;
  }
}
