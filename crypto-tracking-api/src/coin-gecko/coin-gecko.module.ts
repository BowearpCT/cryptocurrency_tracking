import { Module } from '@nestjs/common';
import { CoinGeckoService } from './coin-gecko.service';
import { CoinGeckoController } from './coin-gecko.controller';

@Module({
  providers: [CoinGeckoService],
  controllers: [CoinGeckoController],
  exports: [CoinGeckoService],
})
export class CoinGeckoModule {}
