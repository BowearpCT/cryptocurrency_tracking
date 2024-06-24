import { CHAIN } from '../constants/chain';

export type Token = {
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
};

export type AvailableChain = (typeof CHAIN)[keyof typeof CHAIN];
