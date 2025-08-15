import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  salary: string;

  @Column({ nullable: true })
  techStack: string;

  @Column({ nullable: true })
  jobType: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  source: string;

  @Column({ nullable: true })
  dateApplied: Date;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  timeline: string;

  @ManyToOne(() => User, user => user.id)
  user: User;
}
