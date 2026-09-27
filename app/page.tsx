import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.18),_transparent_35%),linear-gradient(180deg,_#020817_0%,_#020617_100%)] px-6">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-glow backdrop-blur-xl md:p-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-lg font-bold text-emerald-400">T</div>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-emerald-400">TradePilot</div>
              <div className="text-sm text-slate-300">AI-powered trading desk</div>
            </div>
          </div>
          <Link href="/login" className="rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-emerald-400">
            Open App
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
              Trading platform MVP
            </div>
            <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-6xl">
              Trade smarter with real-time market insight.
            </h1>
            <p className="mb-8 max-w-xl text-lg text-slate-300">
              Monitor equities and crypto, review portfolio performance, place orders, and act on the market without leaving a premium dashboard.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/login" className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:scale-[1.01] hover:bg-emerald-400">
                Login to dashboard
              </Link>
              <Link href="/dashboard" className="rounded-xl border border-slate-700 bg-slate-950 px-6 py-3 font-semibold text-slate-100 transition hover:border-slate-500">
                View demo dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/50">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Market pulse</p>
                <h2 className="text-3xl font-bold text-white">$2.48T</h2>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-400">+2.72%</span>
            </div>

            <div className="space-y-4">
              {[
                { symbol: 'AAPL', value: '$214.43', change: '+1.84%' },
                { symbol: 'BTC', value: '$64,420.12', change: '+4.11%' },
                { symbol: 'MSFT', value: '$432.91', change: '+0.76%' },
                { symbol: 'ETH', value: '$3,480.15', change: '+2.35%' }
              ].map((item) => (
                <div key={item.symbol} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-3">
                  <div>
                    <div className="font-semibold text-white">{item.symbol}</div>
                    <div className="text-xs text-slate-400">Market index</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">{item.value}</div>
                    <div className="text-xs text-emerald-400">{item.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
