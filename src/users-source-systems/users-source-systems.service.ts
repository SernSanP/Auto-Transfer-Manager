import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { CreateUserSourceSystemDto } from './dto/create-user-source-system-dto';
import { GetUsersSourceSystemFilterDto } from './dto/get-users-source-system-filter.dto';
import { UpdateUserInfoDto } from './dto/update-user-source-system.dto';
import { UsersSourceSystem } from './users-source-system.entity';
import { UsersSourceSystemsRepository } from './users-source-systems.repository';

@Injectable()
export class UsersSourceSystemsService {
  constructor(
    @InjectRepository(UsersSourceSystemsRepository)
    private usersRepository: UsersSourceSystemsRepository,
  ) {}

  getUsers(
    filterDto: GetUsersSourceSystemFilterDto,
  ): Promise<UsersSourceSystem[]> {
    return this.usersRepository.getUsers(filterDto);
  }

  async getUserById(id: string): Promise<UsersSourceSystem> {
    const found = await this.usersRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return found;
  }

  async blockUser(id: string): Promise<UsersSourceSystem> {
    const user = await this.getUserById(id);
    user.is_blocked = true;
    await this.usersRepository.save(user);
    return user;
  }

  async createUser(
    createUserSourceSystemDto: CreateUserSourceSystemDto,
    user: User,
  ): Promise<UsersSourceSystem> {
    return this.usersRepository.createUser(createUserSourceSystemDto, user);
  }

  async updateUserInfo(
    id: string,
    updateUserInfoDto: UpdateUserInfoDto,
  ): Promise<UsersSourceSystem> {
    const {
      source_system_name,
      limit_balance_per_transaction,
      limit_balance_per_day,
    } = updateUserInfoDto;
    const user = await this.getUserById(id);
    user.source_system_name = source_system_name;
    user.limit_balance_per_transaction = limit_balance_per_transaction;
    user.limit_balance_per_day = limit_balance_per_day;
    await this.usersRepository.save(user);
    return user;
  }
}
