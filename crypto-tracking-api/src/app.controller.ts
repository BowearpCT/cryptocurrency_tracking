import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  async healthCheck(): Promise<string> {
    try {
      // await this.userRepository.query('SELECT 1');
      return 'Database connection is healthy';
    } catch (error) {
      return 'Database connection failed';
    }
  }
}
