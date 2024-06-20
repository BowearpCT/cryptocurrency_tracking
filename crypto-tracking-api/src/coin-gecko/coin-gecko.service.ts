import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CoinGeckoService {
  private readonly baseUrl: string = 'https://api.coingecko.com/api/v3';
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create();
    this.axiosInstance.defaults.headers['x-cg-demo-api-key'] =
      process.env.COIN_GECKO_API_KEY;
    this.axiosInstance.defaults.baseURL = this.baseUrl;
  }

  async getCoinData(coinId: string): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`/coins/${coinId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch coin data');
    }
  }

  async getCoinPrices(coinIds: string[]): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`/simple/price`, {
        params: {
          ids: coinIds.join(','),
          vs_currencies: 'btc',
          include_24hr_change: 'true',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch coin prices');
    }
  }
}
