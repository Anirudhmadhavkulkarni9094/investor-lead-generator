import { NextRequest } from 'next/server';
import connect from '@/lib/mongodb';
import InvestorLead from '@/models/investorLead';

export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    console.log('Received body:', body);
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
      additionalInfo
    } = body;

    // Basic validation
    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Name and email are required.' }), {
        status: 400,
      });
    }

    // Save to DB
    const lead = await InvestorLead.create({
      name,
      email,
      phone,
      investorType,
      geography,
      industry,
      stage,
      investmentSize,
      status,
      additionalInfo
    });

    return new Response(JSON.stringify({ success: true, message: 'Lead submitted successfully', lead }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error processing investor lead:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
