import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersRepository.getUsers(filterDto);
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.usersRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return found;
  }

  async blockUser(id: string): Promise<User> {
    const user = await this.getUserById(id);
    user.is_blocked = true;
    await this.usersRepository.save(user);
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    return this.usersRepository.createUser(createUserDto);
  }

  async updateUserInfo(
    id: string,
    updateUserInfoDto: UpdateUserInfoDto,
  ): Promise<User> {
    const { email, first_name, last_name } = updateUserInfoDto;
    const user = await this.getUserById(id);
    user.email = email;
    user.first_name = first_name;
    user.last_name = last_name;
    await this.usersRepository.save(user);
    return user;
  }
}
