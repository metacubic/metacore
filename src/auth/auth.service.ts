import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../api/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../api/user/entities/user.entity';
import { JwtPayload } from './dto/payload.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../api/user/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private getTokenPayload(user: User): JwtPayload {
    return {
      username: user.username,
      id: user.id,
      email: user.email,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findByEmail(payload.email);
  }

  public async login(loginDto: LoginDto): Promise<any> {
    const payload = { username: loginDto.username, sub: loginDto.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async register(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    try {
      const createdUser = await this.userService.createUser({
        ...createUserDto,
        password: hashedPassword,
      });
      if (createdUser instanceof User) {
        createdUser.password = undefined;
      }
      return createdUser;
    } catch (error) {
      if (error?.code === '23505') {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
