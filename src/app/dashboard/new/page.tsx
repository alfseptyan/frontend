'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function NewTaskPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_at: '',
    remind_at: ''
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/tasks', formData);
      router.push('/dashboard');
    } catch (error) {
      alert('Failed to create task');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-slate-800 p-6 rounded-lg border border-slate-700">
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-teal-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-teal-400"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="datetime-local"
            value={formData.due_at}
            onChange={(e) => setFormData({...formData, due_at: e.target.value})}
            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-teal-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Reminder Time</label>
          <input
            type="datetime-local"
            value={formData.remind_at}
            onChange={(e) => setFormData({...formData, remind_at: e.target.value})}
            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-teal-400"
          />
          <p className="text-xs text-slate-500 mt-1">Leave blank if no reminder needed.</p>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-teal-500 to-indigo-600 rounded font-semibold hover:opacity-90 transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
