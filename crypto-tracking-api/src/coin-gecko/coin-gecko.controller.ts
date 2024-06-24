import { Controller, Get, Query } from '@nestjs/common';
import { CoinGeckoService } from './coin-gecko.service';

@Controller('coin-gecko')
export class CoinGeckoController {
  constructor(private readonly coinGeckoService: CoinGeckoService) {}

  @Get('coin')
  async getCoin(@Query('id') id: string) {
    return this.coinGeckoService.getCoinData(id);
  }
}
