import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable({})
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: LoginDTO): Promise<{
    message: string;
    access_token: string;
  }> {
    const checkUser = await this.usersService.findByUsername(user.username);

    if (!checkUser) {
      throw new NotFoundException('User not found!');
    }

    const isPasswordCorrect = bcrypt.compareSync(
      user.password,
      checkUser.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Wrong password');
    }

    return {
      message: 'Login successful',
      access_token: this.jwtService.sign({
        ...checkUser,
      }),
    };
  }

  async register(user: RegisterDTO | any): Promise<{
    message: string;
    access_token: string;
  }> {
    return await this.usersService.createUser(user.username, user);
  }
}
