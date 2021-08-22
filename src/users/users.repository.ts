import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    const { search, is_admin, is_blocked } = filterDto;
    const query = this.createQueryBuilder('user');
    if (is_admin) {
      query.andWhere('user.is_admin = :is_admin', { is_admin });
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

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    const { email, password, first_name, last_name } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      is_admin: false,
      is_blocked: false,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user.id;
  }
}
