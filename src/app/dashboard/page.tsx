'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  dueAt: string;
  isDone: boolean;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks');
    }
  };

  const markDone = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/tasks/${id}`, { is_done: !currentStatus });
      fetchTasks();
    } catch (error) {
      alert('Failed to update task');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Tasks</h2>
        <Link href="/dashboard/new" className="px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-600 rounded hover:opacity-90">
          + New Task
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map(task => (
           <div key={task.id} className={`p-4 rounded-lg border ${task.isDone ? 'border-green-800 bg-slate-800/50 opacity-75' : 'border-slate-700 bg-slate-800'}`}>
             <div className="flex justify-between items-start">
               <div>
                 <h3 className={`font-medium text-lg ${task.isDone ? 'line-through text-slate-500' : 'text-white'}`}>{task.title}</h3>
                 <p className="text-sm text-slate-400 mt-1">{task.description}</p>
                 <p className="text-xs text-slate-500 mt-2">Due: {new Date(task.dueAt).toLocaleString()}</p>
               </div>
               <button 
                 onClick={() => markDone(task.id, task.isDone)}
                 className={`text-xs px-2 py-1 rounded border ${task.isDone ? 'border-yellow-600 text-yellow-500' : 'border-green-600 text-green-500'}`}
               >
                 {task.isDone ? 'Undo' : 'Done'}
               </button>
             </div>
           </div>
        ))}
      </div>
    </div>
  );
}
