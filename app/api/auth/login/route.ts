import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }

    return NextResponse.json({
      user: {
        id: 'user_1',
        name: 'Alex Morgan',
        email,
        role: 'Trader'
      },
      token: 'demo-token-abc123'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
