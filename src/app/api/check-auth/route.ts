// app/api/check-auth/route.ts
import { cookies } from 'next/headers';

export async function GET() {
  const token = (await cookies()).get('auth_token')?.value;
  return Response.json({ authenticated: token === 'valid_user' });
}
