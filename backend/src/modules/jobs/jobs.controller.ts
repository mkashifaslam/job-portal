import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Post()
  create(@Body() job: Partial<Job>): Promise<Job> {
    return this.jobsService.create(job);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() job: Partial<Job>): Promise<Job> {
    return this.jobsService.update(id, job);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.jobsService.remove(id);
  }
}
