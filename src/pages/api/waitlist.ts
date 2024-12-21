// pages/api/waitlist.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Waitlist from '@/../models/waitlist';

type ResponseData = {
  message: string;
  data?: {
    email: string;
    createdAt: Date;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Connect to database
  await dbConnect();

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email presence
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if email already exists
    const existingEmail = await Waitlist.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Create new waitlist entry
    const waitlistEntry = await Waitlist.create({
      email,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    });

    // Return success response
    return res.status(201).json({
      message: 'Successfully joined waitlist',
      data: {
        email: waitlistEntry.email,
        createdAt: waitlistEntry.createdAt,
      },
    });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  console.log('Request method:', req.method);
console.log('Request body:', req.body);
}
