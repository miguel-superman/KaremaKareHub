'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { Button } from '@/components/ui/button';
import { HeartPulse, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-100 bg-white/80 backdrop-blur px-4">
      <div className=" flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
            <HeartPulse className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">Karema Kare Hub</span>
        </Link>

        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-slate-700">Dashboard</Button>
              </Link>
              <Link href="/admin">
                <Button variant="ghost" className="text-slate-700">Admin</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-slate-700">Sign in</Button>
              </Link>
              <Link href="/apply">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Get started</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
