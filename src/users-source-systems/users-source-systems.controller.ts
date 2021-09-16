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
import { GetUsersSourceSystemFilterDto } from './dto/get-users-source-system-filter.dto';
import { UsersSourceSystem } from './users-source-system.entity';
import { CreateUserSourceSystemDto } from './dto/create-user-source-system-dto';
import { UpdateUserInfoDto } from './dto/update-user-source-system.dto';
import { UsersSourceSystemsService } from './users-source-systems.service';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { GetUser } from 'src/auth/get-relation.decorator';
import { User } from 'src/users/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users-source-systems')
@UseGuards(AuthGuard())
export class UsersSourceSystemsController {
  constructor(private usersSourceSystemsService: UsersSourceSystemsService) {}
  @Get()
  getUsers(
    @Query() filterDto: GetUsersSourceSystemFilterDto,
    @GetUser() user: User,
  ): Promise<UsersSourceSystem[]> {
    return this.usersSourceSystemsService.getUsers(filterDto,user);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UsersSourceSystem> {
    return this.usersSourceSystemsService.getUserById(id);
  }

  @Post()
  createUsers(
    @Body() createUserSourceSystemDto: CreateUserSourceSystemDto,
  ): Promise<UsersSourceSystem> {
    return this.usersSourceSystemsService.createUser(
      createUserSourceSystemDto,
    );
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
