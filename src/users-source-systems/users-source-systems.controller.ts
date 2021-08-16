import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UsersSourceSystem } from './users-source-system.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UsersSourceSystemsService } from './users-source-systems.service';


@Controller('users-source-systems')
export class UsersSourceSystemsController {
  constructor(private usersSourceSystemsService: UsersSourceSystemsService) {}
  @Get()
  getUsers(@Query() filterDto: GetUsersFilterDto): Promise<UsersSourceSystem[]> {
    return this.usersSourceSystemsService.getUsers(filterDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UsersSourceSystem> {
    return this.usersSourceSystemsService.getUserById(id);
  }

  @Post()
  createUsers(@Body() createUserDto: CreateUserDto): Promise<UsersSourceSystem> {
    return this.usersSourceSystemsService.createUser(createUserDto);
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

