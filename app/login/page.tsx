"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('alex@futuretrades.io');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('trading-session', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.15),_transparent_30%),linear-gradient(180deg,_#020817_0%,_#020617_100%)] px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-glow backdrop-blur-xl md:grid-cols-2">
        <div className="space-y-8 bg-slate-950 p-8 md:p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-lg font-bold text-emerald-400">F</div>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-emerald-400">Future Trades</div>
              <div className="text-sm text-slate-300">Secure portfolio access</div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-slate-400">Welcome back</p>
            <h1 className="text-4xl font-black text-white">Sign in to your desk</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-slate-400">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none ring-0 transition focus:border-emerald-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm text-slate-400">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
                placeholder="••••••••"
              />
            </div>

            {error ? <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-between bg-slate-900 p-8 md:p-12">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-emerald-400">Today</p>
            <h2 className="text-3xl font-bold text-white">Market snapshot</h2>
          </div>

          <div className="mt-8 space-y-5">
            {[
              { symbol: 'BTC/USD', value: '$64,420.12', trend: '+4.11%' },
              { symbol: 'ETH/USD', value: '$3,480.15', trend: '+2.35%' },
              { symbol: 'AAPL', value: '$214.43', trend: '+1.84%' },
              { symbol: 'MSFT', value: '$432.91', trend: '+0.76%' }
            ].map((ticker) => (
              <div key={ticker.symbol} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div>
                  <div className="font-semibold text-white">{ticker.symbol}</div>
                  <div className="text-xs text-slate-400">Realtime quote</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{ticker.value}</div>
                  <div className="text-xs text-emerald-400">{ticker.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
