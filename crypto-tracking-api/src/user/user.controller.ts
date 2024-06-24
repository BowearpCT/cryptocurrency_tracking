import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../model/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async createUser(
  //   @Body('username') username: string,
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  // ): Promise<User> {
  //   return this.userService.createUser(username, email, password);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findUserById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findUserByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findUserByUsername(username);
  }
}
