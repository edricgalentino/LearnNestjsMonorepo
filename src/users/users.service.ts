import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
    private notificationService: NotificationsService,
  ) {}

  async findByUsername(username: string): Promise<Users> {
    const findedUser = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.username = :username', { username })
      .getOne();

    if (!findedUser) {
      throw new NotFoundException('User not found');
    }

    return findedUser;
  }

  async getAllUser(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async createUser(
    currentUsername: string,
    newUserData: Users,
  ): Promise<{
    message: string;
    access_token: string;
  }> {
    const checkUser = await this.findByUsername(newUserData.username);

    if (checkUser) {
      if (checkUser.username === newUserData.username) {
        // create notification
        const newNotification = await this.notificationService.create(
          currentUsername,
          `Failed to create user ${newUserData.username} because username already exists`,
          'error',
        );
        throw new BadRequestException('Username already exists');
      }
    }

    const saltOrRounds = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newUserData.password, saltOrRounds);

    const newUser = this.usersRepository.save({
      ...newUserData,
      password: hashedPassword,
    });

    // create notification
    const newNotification = await this.notificationService.create(
      currentUsername,
      `User ${newUserData.username} created successfully`,
      'success',
    );

    return {
      message: 'User created successfully',
      access_token: this.jwtService.sign({
        ...newUser,
      }),
    };
  }

  async editUser(currentUsername: string, user: Users): Promise<Users> {
    const checkUser = await this.findByUsername(user.username);

    if (!checkUser) {
      // create notification
      const newNotification = await this.notificationService.create(
        currentUsername,
        `Failed to edit user ${user.username} because user not found`,
        'error',
      );
      throw new NotFoundException('User not found');
    }

    const saltOrRounds = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, saltOrRounds);

    const updatedUser = await this.usersRepository.save({
      ...user,
      updated_at: new Date(),
      password: hashedPassword,
    });

    // create notification
    const newNotification = await this.notificationService.create(
      currentUsername,
      `User ${user.username} edited successfully`,
      'success',
    );

    return updatedUser;
  }

  async deleteUser(currentUsername: string, username: string): Promise<Users> {
    const checkUser = await this.findByUsername(username);

    if (!checkUser) {
      // create notification
      const newNotification = await this.notificationService.create(
        currentUsername,
        `Failed to delete user ${username} because user not found`,
        'error',
      );
      throw new NotFoundException('User not found');
    }

    const deletedUser = await this.usersRepository.remove(checkUser);

    // create notification
    const newNotification = await this.notificationService.create(
      currentUsername,
      `User ${username} deleted successfully`,
      'success',
    );

    return deletedUser;
  }
}
