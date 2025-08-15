import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => User, user => user.id)
  user: User;
}
