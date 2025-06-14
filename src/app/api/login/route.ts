// app/api/login/route.ts
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // ✅ Replace these with your fixed credentials
  const validUsername = 'muhammadMubeen';
  const validPassword = 'capitalMubeen';

  if (username === validUsername && password === validPassword) {
    (await cookies()).set('auth_token', 'valid_user', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
}
