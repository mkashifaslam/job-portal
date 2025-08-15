const API_URL = 'http://localhost:3000/contacts';

export async function getContacts() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addContact(contact: any) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
  return res.json();
}

export async function updateContact(id: number, contact: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
  return res.json();
}

export async function deleteContact(id: number) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}
