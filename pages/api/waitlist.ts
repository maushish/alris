import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import Waitlist from '../../models/waitlist';

interface WaitlistResponse {
  message: string;
  data?: {
    email: string;
    createdAt: Date;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WaitlistResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { email } = req.body;

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
}