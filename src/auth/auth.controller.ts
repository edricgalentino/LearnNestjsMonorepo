import { Body, Controller, Post } from '@nestjs/common';
import { Users } from 'src/users/entity/users.entity';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userLoginDTO: LoginDTO) {
    return await this.authService.login(userLoginDTO);
  }

  @Post('register')
  async register(@Body() userRegisterDTO: RegisterDTO) {
    return await this.authService.register(userRegisterDTO);
  }
}
