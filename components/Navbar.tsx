// components/Navbar.tsx
"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="text-xl font-bold">AgentFlow</Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          {!user ? (
            <>
              <Link href="/login" className="hover:underline">Login</Link>
              <Link href="/signup" className="hover:underline">Signup</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}