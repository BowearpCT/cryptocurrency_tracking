import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PortfolioService } from './portfolio.service';
import { UserService } from '../user/user.service';
import { CoinGeckoService } from 'src/coin-gecko/coin-gecko.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly userService: UserService,
    private readonly coinGeckoService: CoinGeckoService,
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

  @UseGuards(JwtAuthGuard)
  @Get(':id/detail')
  async getPortfolioDetail(@Param('id') id: string, @Request() req) {
    const portfolio = await this.portfolioService.findPortfolioByIdAndUser(
      Number(id),
      req.user.userId,
    );
    const tokenData = await this.coinGeckoService.getCoinData(
      portfolio.cryptoAddress,
    );

    return {
      portfolio,
      tokenData,
    };
  }
}
