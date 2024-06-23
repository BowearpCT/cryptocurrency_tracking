import { Controller, Get } from '@nestjs/common';
import { WalletScannerService } from './walletScanner.service';

@Controller('walletScanner')
export class walletScannerController {
  constructor(private readonly walletScanner: WalletScannerService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('tokens')
  async getTokens() {
    return;
  }
}
