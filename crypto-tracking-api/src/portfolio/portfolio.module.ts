import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from '../model/portfolio.entity';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { UserModule } from '../user/user.module';
import { CoinGeckoModule } from 'src/coin-gecko/coin-gecko.module';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio]), UserModule, CoinGeckoModule],
  providers: [PortfolioService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
