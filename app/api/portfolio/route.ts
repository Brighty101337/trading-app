import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    summary: {
      portfolioValue: '$124,830.00',
      dayGain: '+$1,240.00',
      buyingPower: '$128,430.00',
      cash: '$42,680.00',
      marginLevel: '64%'
    },
    positions: [
      { symbol: 'AAPL', name: 'Apple Inc.', shares: 120, lastPrice: 214.43, change: 1.84 },
      { symbol: 'MSFT', name: 'Microsoft', shares: 80, lastPrice: 432.91, change: 0.76 },
      { symbol: 'NVDA', name: 'NVIDIA', shares: 150, lastPrice: 123.12, change: 2.35 },
      { symbol: 'BTC', name: 'Bitcoin', shares: 0.85, lastPrice: 64420.12, change: 4.11 }
    ],
    activity: [
      { type: 'Buy', symbol: 'AAPL', qty: 20, status: 'Filled', timestamp: '2m ago' },
      { type: 'Sell', symbol: 'MSFT', qty: 10, status: 'Filled', timestamp: '15m ago' },
      { type: 'Buy', symbol: 'NVDA', qty: 35, status: 'Pending', timestamp: '1h ago' },
      { type: 'Sell', symbol: 'BTC', qty: 0.25, status: 'Filled', timestamp: '3h ago' }
    ]
  });
}
