import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from '../model/portfolio.entity';
import { User } from '../model/user.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async createPortfolio(
    user: User,
    name: string,
    cryptoNetwork: string,
    cryptoAddress: string,
  ): Promise<Portfolio> {
    const portfolio = this.portfolioRepository.create({
      name,
      cryptoNetwork,
      cryptoAddress,
      user,
    });
    return this.portfolioRepository.save(portfolio);
  }

  async getPortfoliosByUser(user: User): Promise<Portfolio[]> {
    return this.portfolioRepository.find({ where: { user } });
  }

  async findPortfolioByIdAndUser(
    id: number,
    userId: number,
  ): Promise<Portfolio> {
    return this.portfolioRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }
}
