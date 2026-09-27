import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Future Trades',
  description: 'Future Trades trading platform dashboard'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">{children}</body>
    </html>
  );
}
