import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './model/user.entity';
import { Portfolio } from './model/portfolio.entity';
import { PortfolioModule } from './portfolio/portfolio.module';
import { PassportModule } from '@nestjs/passport';
import { CoinGeckoModule } from './coin-gecko/coin-gecko.module';
import { WalletScannerModule } from './walletScanner/walletScanner.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Portfolio]),
    UserModule,
    AuthModule,
    PortfolioModule,
    CoinGeckoModule,
    WalletScannerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
