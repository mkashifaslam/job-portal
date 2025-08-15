import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  create(contact: Partial<Contact>): Promise<Contact> {
    const newContact = this.contactRepository.create(contact);
    return this.contactRepository.save(newContact);
  }

  update(id: number, contact: Partial<Contact>): Promise<Contact> {
    return this.contactRepository.save({ ...contact, id });
  }

  async remove(id: number): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
