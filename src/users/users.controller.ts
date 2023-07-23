import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUser() {
    const allUsers = await this.usersService.getAllUser();
    allUsers.forEach((user) => {
      delete user.password;
    });
    return allUsers;
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const findedUser = await this.usersService.findByUsername(username);
    delete findedUser.password;
    return findedUser;
  }

  @Post('create')
  async createUser(@CurrentUser() currentUser: Users, newUser: Users) {
    return await this.usersService.createUser(currentUser.username, newUser);
  }

  @Put('edit')
  async editUser(@CurrentUser() currentUser: Users, user: Users) {
    console.log(user, currentUser);

    return await this.usersService.editUser(currentUser.username, user);
  }

  @Delete('delete/:username')
  async deleteUser(
    @CurrentUser() currentUser: Users,
    @Param('username') username: string,
  ) {
    return await this.usersService.deleteUser(currentUser.username, username);
  }
}
