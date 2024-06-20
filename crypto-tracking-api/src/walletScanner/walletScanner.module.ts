import { Module } from '@nestjs/common';
import { WalletScannerService } from './walletScanner.service';
import { walletScannerController } from './walletScanner.controller';

@Module({
  providers: [WalletScannerService],
  controllers: [walletScannerController],
})
export class EtherscanModule {}
