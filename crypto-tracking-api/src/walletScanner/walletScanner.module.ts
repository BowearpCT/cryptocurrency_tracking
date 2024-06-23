import { Module } from '@nestjs/common';
import { WalletScannerService } from './walletScanner.service';
import { walletScannerController } from './walletScanner.controller';

@Module({
  providers: [WalletScannerService],
  controllers: [walletScannerController],
  exports: [WalletScannerService],
})
export class WalletScannerModule {}
