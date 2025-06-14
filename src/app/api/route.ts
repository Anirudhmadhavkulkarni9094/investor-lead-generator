// app/api/investor-leads/route.ts
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      investorType,
      geography,
      industry,
      stage,
      investmentSize,
      status,
    } = body;

    // Basic validation (optional)
    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Name and email are required.' }), {
        status: 400,
      });
    }


    console.log('Received investor lead:', {
      name,
      email,    
      phone,
      investorType,
      geography,
      industry,
      stage,
      investmentSize,
      status,
    });
    // Process the data here
    // e.g., Save to DB, send email, log to file, etc.

    return new Response(JSON.stringify({ success: true, message: 'Lead submitted successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error processing investor lead:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
