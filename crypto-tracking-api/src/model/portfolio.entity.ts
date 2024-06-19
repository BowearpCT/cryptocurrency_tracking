import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cryptoNetwork: string;

  @Column()
  cryptoAddress: string;

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;
}
