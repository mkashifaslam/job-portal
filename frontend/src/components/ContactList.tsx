import React, { useState, useEffect } from 'react';
import { getContacts, addContact, updateContact, deleteContact } from '../services/contactsApi';

interface Contact {
  id: number;
  name: string;
  email: string;
  company: string;
}

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editCompany, setEditCompany] = useState('');

  useEffect(() => {
    getContacts().then(setContacts);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company) return;
    const newContact = await addContact({ name, email, company });
    setContacts([...contacts, newContact]);
    setName('');
    setEmail('');
    setCompany('');
  };

  const handleDelete = async (id: number) => {
    await deleteContact(id);
    setContacts(contacts.filter(c => c.id !== id));
  };

  const startEdit = (contact: Contact) => {
    setEditingId(contact.id);
    setEditName(contact.name);
    setEditEmail(contact.email);
    setEditCompany(contact.company);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;
    const updated = await updateContact(editingId, { name: editName, email: editEmail, company: editCompany });
    setContacts(contacts.map(c => (c.id === editingId ? updated : c)));
    setEditingId(null);
    setEditName('');
    setEditEmail('');
    setEditCompany('');
  };

  return (
    <div>
      <form className="mb-4 flex gap-2" onSubmit={handleAdd}>
        <input
          className="border px-2 py-1 rounded"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="border px-2 py-1 rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border px-2 py-1 rounded"
          placeholder="Company"
          value={company}
          onChange={e => setCompany(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded" type="submit">
          Add
        </button>
      </form>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id} className="mb-2 p-2 border rounded flex justify-between items-center">
            {editingId === contact.id ? (
              <form className="flex gap-2 flex-1" onSubmit={handleEdit}>
                <input
                  className="border px-2 py-1 rounded"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                />
                <input
                  className="border px-2 py-1 rounded"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                />
                <input
                  className="border px-2 py-1 rounded"
                  value={editCompany}
                  onChange={e => setEditCompany(e.target.value)}
                />
                <button className="bg-green-600 text-white px-2 py-1 rounded" type="submit">Save</button>
                <button className="bg-gray-400 text-white px-2 py-1 rounded" type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <div>
                  <span className="font-semibold">{contact.name}</span> ({contact.email}) at {contact.company}
                </div>
                <div className="flex gap-2 items-center">
                  <button className="text-blue-600" onClick={() => startEdit(contact)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDelete(contact.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
