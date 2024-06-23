import axios from 'axios';
import { Token } from './type';
import { WalletScanner } from './interface';
import { CHAIN } from '../constants/chain';

export class EtherscanService implements WalletScanner {
  name: string;
  chain: string;
  address: string;
  constructor(addresss: string) {
    this.name = 'EtherScan';
    this.chain = CHAIN.ETH;
    this.address = addresss;
  }

  async listWalletCoin(): Promise<Token[]> {
    const url = `https://api.etherscan.com/api`;
    const axiosInstance = axios.create({
      baseURL: url,
      params: {
        module: 'account',
        action: 'tokentx',
        address: this.address,
        page: 1,
        offset: 20,
        startblock: 0,
        endblock: 999999999,
        sort: 'asc',
        apikey: process.env.EHERSCAN_API_KEY,
      },
    });
    const tokens: Token[] = [];
    let isContinue: boolean = true;
    while (isContinue) {
      try {
        const response = await axiosInstance.get('/');
        response.data.result.foreach((tx) => {
          const existingToken = tokens.find(
            (token) => token.tokenName === tx.tokenName,
          );
          if (!existingToken) {
            tokens.push({
              tokenName: tx.tokenName,
              tokenSymbol: tx.tokenSymbol,
              tokenDecimal: tx.tokenDecimal,
            });
          }
        });
        isContinue = response.data.status === '1';
      } catch (error) {
        isContinue = false;
      }
    }
    return tokens;
  }
}
