import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from '../model/portfolio.entity';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { UserModule } from '../user/user.module';
import { CoinGeckoModule } from '../coin-gecko/coin-gecko.module';
import { WalletScannerModule } from '../walletScanner/walletScanner.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Portfolio]),
    UserModule,
    CoinGeckoModule,
    WalletScannerModule,
  ],
  providers: [PortfolioService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
