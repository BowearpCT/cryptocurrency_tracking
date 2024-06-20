import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WalletScannerService {
  private readonly baseUrl: string = 'https://api.etherscan.io/api';
  private readonly apiKey: string = process.env.ETHERSCAN_API_KEY;

  async getTokens(address: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}`, {
        params: {
          module: 'account',
          action: 'tokentx',
          address: address,
          startblock: 0,
          endblock: 99999999,
          sort: 'asc',
          apikey: this.apiKey,
        },
      });
      return response.data.result;
    } catch (error) {
      throw new Error('Failed to fetch tokens');
    }
  }
}
