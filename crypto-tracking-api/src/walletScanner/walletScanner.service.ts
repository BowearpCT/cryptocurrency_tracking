import { Injectable } from '@nestjs/common';
import { CHAIN } from '../constants/chain';
import { BscScanService } from './bscScan.service';
import { EtherscanService } from './ethScan.service';

@Injectable()
export class WalletScannerService {
  createScanner(chain: (typeof CHAIN)[keyof typeof CHAIN], address: string) {
    console.log({ chain });
    switch (chain) {
      case CHAIN.BSC:
        return new BscScanService(address);
      case CHAIN.ETH:
        return new EtherscanService(address);
      default:
        return null;
    }
  }
}
