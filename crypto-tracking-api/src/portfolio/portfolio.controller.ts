import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PortfolioService } from './portfolio.service';
import { UserService } from '../user/user.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPortfolio(
    @Request() req,
    @Body('name') name: string,
    @Body('cryptoNetwork') cryptoNetwork: string,
    @Body('cryptoAddress') cryptoAddress: string,
  ) {
    const user = await this.userService.findUserById(req.user.userId);
    return this.portfolioService.createPortfolio(
      user,
      name,
      cryptoNetwork,
      cryptoAddress,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPortfolios(@Request() req) {
    const user = await this.userService.findUserById(req.user.userId);
    return this.portfolioService.getPortfoliosByUser(user);
  }
}
