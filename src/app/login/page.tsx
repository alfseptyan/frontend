'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-900 text-white">
      <div className="w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-teal-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-teal-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-teal-500 to-indigo-600 rounded font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-400">
          Don't have an account? <Link href="/register" className="text-teal-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
