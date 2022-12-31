import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findUser(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async createUser(createUser: CreateUserDto): Promise<
    | {
        username: string;
        firstName: any;
        lastName: any;
        email: any;
      }
    | User
  > {
    const user = this.usersRepository.create(createUser);
    return await this.usersRepository.save(user).then((user) => {
      return user
        ? {
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
          }
        : undefined;
    });
  }

  getCurrentUser() {
    return Promise.resolve(undefined);
  }

  async findById(id: string): Promise<User> {
    return Promise.all([
      this.usersRepository.findOne({
        where: {
          id: id,
        },
      }),
    ]).then(([user]) => {
      return UserService.mapUser(user);
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  private static mapUser(user: User): User | undefined {
    if (user) {
      return {
        id: user.id,
        createdAt: undefined,
        password: '',
        addId(): void {
          throw new Error('Method not implemented.');
        },
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
    }
    return undefined;
  }
}
