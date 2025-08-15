import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @Post()
  create(@Body() contact: Partial<Contact>): Promise<Contact> {
    return this.contactsService.create(contact);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() contact: Partial<Contact>): Promise<Contact> {
    return this.contactsService.update(id, contact);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.contactsService.remove(id);
  }
}
