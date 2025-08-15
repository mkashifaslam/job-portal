import React, { useState, useEffect } from 'react';
import { getJobs, addJob, updateJob, deleteJob } from '../services/jobsApi';

interface Job {
  id: number;
  title: string;
  company: string;
  status: string;
}

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCompany, setEditCompany] = useState('');

  useEffect(() => {
    getJobs().then(setJobs);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company) return;
    const newJob = await addJob({ title, company, status: 'Wishlist' });
    setJobs([...jobs, newJob]);
    setTitle('');
    setCompany('');
  };

  const handleDelete = async (id: number) => {
    await deleteJob(id);
    setJobs(jobs.filter(j => j.id !== id));
  };

  const startEdit = (job: Job) => {
    setEditingId(job.id);
    setEditTitle(job.title);
    setEditCompany(job.company);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;
    const updated = await updateJob(editingId, { title: editTitle, company: editCompany });
    setJobs(jobs.map(j => (j.id === editingId ? updated : j)));
    setEditingId(null);
    setEditTitle('');
    setEditCompany('');
  };

  return (
    <div>
      <form className="mb-4 flex gap-2" onSubmit={handleAdd}>
        <input
          className="border px-2 py-1 rounded"
          placeholder="Job Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
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
        {jobs.map(job => (
          <li key={job.id} className="mb-2 p-2 border rounded flex justify-between items-center">
            {editingId === job.id ? (
              <form className="flex gap-2 flex-1" onSubmit={handleEdit}>
                <input
                  className="border px-2 py-1 rounded"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
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
                  <span className="font-semibold">{job.title}</span> at {job.company}
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">{job.status}</span>
                  <button className="text-blue-600" onClick={() => startEdit(job)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDelete(job.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
