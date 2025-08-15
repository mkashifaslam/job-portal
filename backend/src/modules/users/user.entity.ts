import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  resume: string;

  @Column({ nullable: true })
  skills: string;

  @Column({ nullable: true })
  experience: string;

  @Column({ nullable: true })
  preferredJobTypes: string;
}
