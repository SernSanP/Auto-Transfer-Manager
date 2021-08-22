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
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UsersSourceSystem } from './users-source-system.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UsersSourceSystemsService } from './users-source-systems.service';
import { Roles } from 'src/Roles/roles.decorator';
import { RolesGuard } from 'src/Roles/roles.guard';
import { GetUser } from 'src/auth/get-relation.decorator';
import { User } from 'src/users/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users-source-systems')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard())
export class UsersSourceSystemsController {
  constructor(private usersSourceSystemsService: UsersSourceSystemsService) {}
  @Get()
  getUsers(
    @Query() filterDto: GetUsersFilterDto,
    @GetUser() user: User,
  ): Promise<UsersSourceSystem[]> {
    return this.usersSourceSystemsService.getUsers(filterDto, user);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UsersSourceSystem> {
    return this.usersSourceSystemsService.getUserById(id);
  }

  @Post()
  createUsers(
    @Body() createUserDto: CreateUserDto,
    @GetUser() user: User,
  ): Promise<UsersSourceSystem> {
    return this.usersSourceSystemsService.createUser(createUserDto, user);
  }

  @Delete('/:id')
  blockUser(@Param('id') id: string): Promise<UsersSourceSystem> {
    return this.usersSourceSystemsService.blockUser(id);
  }

  @Patch('/:id')
  updateUserInfo(
    @Param('id') id: string,
    @Body() updateUserInfoDto: UpdateUserInfoDto,
  ): Promise<UsersSourceSystem> {
    return this.usersSourceSystemsService.updateUserInfo(id, updateUserInfoDto);
  }
}
