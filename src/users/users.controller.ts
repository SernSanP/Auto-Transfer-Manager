import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { RequiredRoles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { GetUser } from 'src/auth/get-relation.decorator';

@Controller('users')
@UseGuards(AuthGuard(),RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Get()
  @RequiredRoles(Role.Authenticator,Role.Manager)
  getUsers(
    @Query() filterDto: GetUsersFilterDto,
  ): Promise<User[]> {
    return this.usersService.getUsers(filterDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUsers(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.usersService.createUser(createUserDto);
  }

  @Delete('/:id')
  blockUser(@Param('id') id: string): Promise<User> {
    return this.usersService.blockUser(id);
  }

  @Patch('/:id')
  updateUserInfo(
    @Param('id') id: string,
    @Body() updateUserInfoDto: UpdateUserInfoDto,
  ): Promise<User> {
    return this.usersService.updateUserInfo(id, updateUserInfoDto);
  }
}
