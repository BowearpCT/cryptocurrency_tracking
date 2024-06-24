import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Portfolio } from './portfolio.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios: Portfolio[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
