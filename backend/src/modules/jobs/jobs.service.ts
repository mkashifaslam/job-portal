import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  findAll(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  create(job: Partial<Job>): Promise<Job> {
    const newJob = this.jobRepository.create(job);
    return this.jobRepository.save(newJob);
  }

  update(id: number, job: Partial<Job>): Promise<Job> {
    return this.jobRepository.save({ ...job, id });
  }

  async remove(id: number): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
