"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [market, setMarket] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [side, setSide] = useState<'Buy' | 'Sell'>('Buy');
  const [qty, setQty] = useState(25);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('trading-session');
    if (!session) {
      router.replace('/login');
      return;
    }

    const parsed = JSON.parse(session);
    setUser(parsed);

    fetch('/api/market')
      .then((res) => res.json())
      .then((data) => setMarket(data))
      .catch(() => setMarket(null));

    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => setPortfolio(data))
      .catch(() => setPortfolio(null));
  }, [router]);

  const selectedQuote = useMemo(() => {
    const quote = market?.watchlist?.find((item: any) => item.symbol === selectedSymbol);
    return quote || market?.watchlist?.[0];
  }, [market, selectedSymbol]);

  if (!user || !market || !portfolio) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
        <div className="text-lg">Loading dashboard...</div>
      </main>
    );
  }

  const handleOrderSubmit = () => {
    if (!selectedQuote) return;
    const orderValue = selectedQuote.price * qty;
    setStatus(`${side} order for ${qty} ${selectedSymbol} shares submitted — est. $${orderValue.toFixed(2)}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-50">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">Future Trades</p>
            <h1 className="text-3xl font-black">Trading dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200">
              {user.name}
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('trading-session');
                router.push('/login');
              }}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500"
            >
              Log out
            </button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <MetricCard label="Portfolio value" value={portfolio.summary.portfolioValue} delta={portfolio.summary.dayGain} tone="up" />
          <MetricCard label="Buying power" value={portfolio.summary.buyingPower} delta="Available" tone="neutral" />
          <MetricCard label="Cash" value={portfolio.summary.cash} delta="Liquid" tone="neutral" />
          <MetricCard label="Account status" value="Active" delta={portfolio.summary.marginLevel} tone="up" />
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-glow">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Selected symbol</p>
                <h2 className="text-3xl font-bold">{selectedSymbol}</h2>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold">${selectedQuote.price.toFixed(2)}</div>
                <div className={`text-sm ${selectedQuote.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {selectedQuote.change >= 0 ? '+' : ''}{selectedQuote.change.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="mb-4 flex gap-2 text-xs">
              {['1D', '1W', '1M', '3M', '1Y', 'All'].map((range) => (
                <button
                  key={range}
                  className={`rounded-lg px-3 py-1.5 ${range === '1D' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                >
                  {range}
                </button>
              ))}
            </div>

            <div className="h-64 rounded-xl bg-slate-950 p-3">
              <svg viewBox="0 0 600 220" className="h-full w-full">
                <defs>
                  <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {[0, 1, 2, 3].map((line) => (
                  <line key={line} x1="0" x2="600" y1={40 + line * 50} y2={40 + line * 50} stroke="#1e293b" strokeDasharray="4 4" />
                ))}

                <path
                  d="M0 180 C70 150, 120 120, 170 140 S260 170, 320 110 S420 70, 470 110 S540 120, 600 55 L600 220 L0 220 Z"
                  fill="url(#chartFill)"
                />
                <path
                  d="M0 180 C70 150, 120 120, 170 140 S260 170, 320 110 S420 70, 470 110 S540 120, 600 55"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <h3 className="mb-4 text-lg font-semibold">Order ticket</h3>

            <div className="mb-4 flex rounded-xl bg-slate-800 p-1">
              {(['Buy', 'Sell'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setSide(option)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                    side === option
                      ? option === 'Buy'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-red-500 text-white'
                      : 'text-slate-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm text-slate-400">Symbol</label>
              <select
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
              >
                {market.watchlist.map((stock: any) => (
                  <option key={stock.symbol} value={stock.symbol}>{stock.symbol}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm text-slate-400">Quantity</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value) || 1)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="mb-5 rounded-xl border border-slate-700 bg-slate-950 p-3">
              <div className="mb-2 flex justify-between text-sm text-slate-400">
                <span>Estimated cost</span>
                <span>${(selectedQuote.price * qty).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Market price</span>
                <span>${selectedQuote.price.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleOrderSubmit}
              className={`w-full rounded-xl px-4 py-3 font-semibold ${
                side === 'Buy' ? 'bg-emerald-500 text-slate-950' : 'bg-red-500 text-white'
              }`}
            >
              {side} {qty} shares
            </button>

            {status ? <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">{status}</div> : null}
          </aside>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Watchlist</h3>
              <span className="text-sm text-slate-400">Realtime</span>
            </div>

            <div className="space-y-3">
              {market.watchlist.map((stock: any) => (
                <button
                  key={stock.symbol}
                  onClick={() => setSelectedSymbol(stock.symbol)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
                    selectedSymbol === stock.symbol ? 'border-emerald-500 bg-slate-800' : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{stock.symbol}</div>
                    <div className="text-xs text-slate-400">{stock.market}</div>
                  </div>
                  <div className="text-right">
                    <div>${stock.price.toFixed(2)}</div>
                    <div className={`text-xs ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Portfolio</h3>
              <span className="text-sm text-slate-400">Positions</span>
            </div>

            <div className="space-y-3">
              {portfolio.positions.map((pos: any) => (
                <div key={pos.symbol} className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{pos.symbol}</div>
                      <div className="text-xs text-slate-400">{pos.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${pos.lastPrice.toFixed(2)}</div>
                      <div className="text-xs text-emerald-400">+{pos.change.toFixed(2)}%</div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-slate-400">
                    <span>{pos.shares} shares</span>
                    <span>${(pos.shares * pos.lastPrice).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent activity</h3>
            <span className="text-sm text-slate-400">Today</span>
          </div>

          <div className="space-y-3">
            {portfolio.activity.map((item: any, index: number) => (
              <div key={`${item.symbol}-${index}`} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div>
                  <div className="font-medium">
                    {item.type} {item.symbol}
                  </div>
                  <div className="text-xs text-slate-400">{item.qty} shares • {item.timestamp}</div>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs ${item.status === 'Filled' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({ label, value, delta, tone }: { label: string; value: string; delta: string; tone: 'up' | 'neutral' }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      <div className={`mt-2 text-sm ${tone === 'up' ? 'text-emerald-400' : 'text-slate-300'}`}>{delta}</div>
    </div>
  );
}
