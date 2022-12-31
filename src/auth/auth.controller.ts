import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../api/user/dto/createUser.dto';

@ApiTags('Authentication Controller')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login to user account' })
  async login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  async register(@Body() register: CreateUserDto) {
    return this.authService.register(register);
  }
}
