'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">WA Reminder</h1>
        <button onClick={handleLogout} className="text-sm text-slate-300 hover:text-white">Logout</button>
      </nav>
      <main className="p-4 max-w-4xl mx-auto">
        {children}
      </main>
    </div>
  );
}
