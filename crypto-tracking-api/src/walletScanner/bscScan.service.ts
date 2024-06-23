import axios from 'axios';
import { Token } from './type';
import { WalletScanner } from './interface';
import { CHAIN } from '../constants/chain';

export class BscScanService implements WalletScanner {
  name: string;
  chain: string;
  address: string;
  constructor(addresss: string) {
    this.name = 'BscScan';
    this.chain = CHAIN.BSC;
    this.address = addresss;
  }

  async listWalletCoin(): Promise<Token[]> {
    const url = `https://api.bscscan.com/api`;
    let page = 1;
    const axiosInstance = axios.create({
      baseURL: url,
      params: {
        module: 'account',
        action: 'tokentx',
        address: this.address,
        page: page,
        offset: 20,
        startblock: 0,
        endblock: 999999999,
        sort: 'asc',
        apikey: process.env.BSCSCAN_API_KEY,
      },
    });
    const tokens: Token[] = [];
    let isContinue: boolean = true;
    while (isContinue) {
      try {
        const response = await axiosInstance.get('/', {
          params: { page: page },
        });
        if (response.data.status === '0') {
          throw new Error(response.data.result);
        }
        response.data.result.foreach((tx) => {
          const existingToken = tokens.find(
            (token) => token.tokenSymbol === tx.tokenSymbol,
          );
          console.log({ existingToken });
          if (!existingToken) {
            tokens.push({
              tokenName: tx.tokenName,
              tokenSymbol: tx.tokenSymbol,
              tokenDecimal: tx.tokenDecimal,
            });
          }
        });
        page = page + 1;
      } catch (error) {
        console.error(error);
        isContinue = false;
      }
    }
    return tokens;
  }
}
