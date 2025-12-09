'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    whatsapp_number: ''
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      router.push('/login');
    } catch (error: any) {
      const msg = error.response?.data?.error || error.message || 'Registration failed';
      alert(`Registration Error: ${msg}`);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-900 text-white">
      <div className="w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
           <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-teal-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-teal-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-teal-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp Number (with country code)</label>
            <input
              type="text"
              placeholder="628123456789"
              value={formData.whatsapp_number}
              onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-teal-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-teal-500 to-indigo-600 rounded font-semibold hover:opacity-90 transition"
          >
            Register
          </button>
        </form>
         <p className="mt-4 text-center text-sm text-slate-400">
          Already have an account? <Link href="/login" className="text-teal-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
