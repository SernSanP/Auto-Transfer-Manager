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
import { Roles } from 'src/Roles/roles.decorator';
import { Role } from 'src/Roles/role.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers(@Query() filterDto: GetUsersFilterDto): Promise<User[]> {
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
