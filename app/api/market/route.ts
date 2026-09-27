import { NextResponse } from 'next/server';

const marketWatchlist = [
  { symbol: 'AAPL', market: 'NASDAQ', price: 214.43, change: 1.84 },
  { symbol: 'MSFT', market: 'NASDAQ', price: 432.91, change: 0.76 },
  { symbol: 'NVDA', market: 'NASDAQ', price: 123.12, change: 2.35 },
  { symbol: 'AMZN', market: 'NASDAQ', price: 187.8, change: -0.44 },
  { symbol: 'TSLA', market: 'NASDAQ', price: 248.21, change: 3.12 },
  { symbol: 'BTC', market: 'CRYPTO', price: 64420.12, change: 4.11 },
  { symbol: 'ETH', market: 'CRYPTO', price: 3480.15, change: 2.35 }
];

export async function GET() {
  return NextResponse.json({
    watchlist: marketWatchlist,
    summary: {
      index: 'NASDAQ 100',
      value: '12,480.44',
      change: '+1.27%'
    }
  });
}
