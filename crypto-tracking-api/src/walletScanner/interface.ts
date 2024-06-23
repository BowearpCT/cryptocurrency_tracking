import { Token } from './type';

export interface WalletScanner {
  name: string;
  chain: string;
  address: string;

  listWalletCoin(): Promise<Token[]>;
}
