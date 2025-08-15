const API_URL = 'http://localhost:3000/jobs';

export async function getJobs() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addJob(job: any) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  return res.json();
}

export async function updateJob(id: number, job: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  return res.json();
}

export async function deleteJob(id: number) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}
