import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from './modules/jobs/job.entity';
import { Contact } from './modules/contacts/contact.entity';
import {User} from "./modules/users/user.entity";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const jobRepo = app.get(getRepositoryToken(Job));
  const contactRepo = app.get(getRepositoryToken(Contact));
  const userRepo = app.get(getRepositoryToken(User));


  // Dummy users
  const users = [
    { email: 'user1@example.com', password: 'password1', name: 'User One', skills: 'React,Node', experience: '2 years', preferredJobTypes: 'remote' },
    { email: 'user2@example.com', password: 'password2', name: 'User Two', skills: 'Angular,NestJS', experience: '3 years', preferredJobTypes: 'local' },
    { email: 'user3@example.com', password: 'password3', name: 'User Three', skills: 'Vue,Python', experience: '1 year', preferredJobTypes: 'contract' },
  ];
  for (const user of users) {
    const exists = await userRepo.findOne({ where: { email: user.email } });
    if (!exists) await userRepo.save(user);
  }

  // Dummy jobs
  const jobs = [
    { title: 'Frontend Developer', company: 'Acme Corp', status: 'Applied' },
    { title: 'Backend Engineer', company: 'Beta Inc', status: 'Interview' },
    { title: 'Full Stack Dev', company: 'Gamma LLC', status: 'Wishlist' },
  ];
  for (const job of jobs) {
    const exists = await jobRepo.findOne({ where: { title: job.title, company: job.company } });
    if (!exists) await jobRepo.save(job);
  }

  // Dummy contacts
  const contacts = [
    { name: 'Jane Doe', email: 'jane@acme.com', company: 'Acme Corp' },
    { name: 'John Smith', email: 'john@beta.com', company: 'Beta Inc' },
    { name: 'Alice Brown', email: 'alice@gamma.com', company: 'Gamma LLC' },
  ];
  for (const contact of contacts) {
    const exists = await contactRepo.findOne({ where: { email: contact.email, company: contact.company } });
    if (!exists) await contactRepo.save(contact);
  }

  await app.close();
  console.log('Seeding complete!');
}

bootstrap();
