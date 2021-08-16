import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UsersSourceSystem } from './users-source-system.entity';
import { UsersSourceSystemsRepository } from './users-source-systems.repository';

@Injectable()
export class UsersSourceSystemsService {
  constructor(
    @InjectRepository(UsersSourceSystemsRepository)
    private usersRepository: UsersSourceSystemsRepository,
  ) {}

  getUsers(filterDto: GetUsersFilterDto): Promise<UsersSourceSystem[]> {
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

  async createUser(createUserDto: CreateUserDto): Promise<UsersSourceSystem> {
    return this.usersRepository.createUser(createUserDto);
  }

  async updateUserInfo(id:string, updateUserInfoDto: UpdateUserInfoDto): Promise<UsersSourceSystem>{
    const { source_system_name, limit_balance_per_transaction, limit_balance_per_day } = updateUserInfoDto
    const user = await this.getUserById(id);
    user.source_system_name = source_system_name;
    user.limit_balance_per_transaction = limit_balance_per_transaction;
    user.limit_balance_per_day = limit_balance_per_day;
    await this.usersRepository.save(user);
    return user;
  }
}
