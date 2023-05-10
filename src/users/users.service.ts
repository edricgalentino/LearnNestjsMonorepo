import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async findByUsername(username: string): Promise<Users> {
    return await this.usersRepository
      .createQueryBuilder('users')
      .where('users.username = :username', { username })
      .getOne();
  }

  async login(user: Users): Promise<{
    message: string;
    access_token: string;
  }> {
    const checkUser = await this.findByUsername(user.username);

    if (!checkUser) {
      throw new Error('User not found');
    }

    const isPasswordCorrect = bcrypt.compareSync(
      user.password,
      checkUser.password,
    );

    if (!isPasswordCorrect) {
      throw new Error('Wrong password');
    }

    return {
      message: 'Login successful',
      access_token: this.jwtService.sign({
        ...checkUser,
      }),
    };
  }

  async createUser(user: Users): Promise<{
    message: string;
    access_token: string;
  }> {
    const checkUser = await this.findByUsername(user.username);

    if (checkUser) {
      if (checkUser.username === user.username) {
        throw new Error('Username already exists');
      }
    }

    const saltOrRounds = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, saltOrRounds);

    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });

    return {
      message: 'User created successfully',
      access_token: this.jwtService.sign({
        ...newUser,
      }),
    };
  }

  async editUser(user: Users): Promise<Users> {
    const checkUser = await this.findByUsername(user.username);

    if (!checkUser) {
      throw new Error('User not found');
    }

    const saltOrRounds = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, saltOrRounds);

    const updatedUser = await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });

    return updatedUser;
  }

  async deleteUser(username: string): Promise<Users> {
    const checkUser = await this.findByUsername(username);

    if (!checkUser) {
      throw new Error('User not found');
    }

    const deletedUser = await this.usersRepository.remove(checkUser);

    return deletedUser;
  }
}
