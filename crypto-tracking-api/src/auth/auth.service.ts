import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../model/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const authUser = await this.validateUser(user.username, user.password);
    if (!authUser) {
      throw new UnauthorizedException('invalid credentials');
    }
    const payload = {
      username: authUser.username,
      user: {
        ...authUser,
        password: undefined,
      },
      sub: authUser.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        ...authUser,
        password: undefined,
      },
    };
  }

  async register(username: string, email: string, password: string) {
    const existingUser = await this.userService.findUserByUsername(username);
    if (existingUser) {
      throw new BadRequestException('duplicated username.');
    }
    return this.userService.createUser(username, email, password);
  }
}
