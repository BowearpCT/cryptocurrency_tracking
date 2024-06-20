import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WalletScannerService } from './walletScanner.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('walletScanner')
export class walletScannerController {
  constructor(private readonly etherscanService: WalletScannerService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('tokens')
  async getTokens(@Query('address') address: string) {
    return this.etherscanService.getTokens(address);
  }
}
