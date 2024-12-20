import mongoose, { Document, Model } from 'mongoose';
import { IWaitlist } from '../types/waitlist';

export interface IWaitlistDocument extends IWaitlist, Document {}

const WaitlistSchema = new mongoose.Schema<IWaitlistDocument>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  source: {
    type: String,
    default: 'website',
  },
  ip: String,
  userAgent: String,
});

// Add indexes for better query performance
WaitlistSchema.index({ email: 1 }, { unique: true });
WaitlistSchema.index({ status: 1 });
WaitlistSchema.index({ createdAt: 1 });

const Waitlist: Model<IWaitlistDocument> = mongoose.models.Waitlist || mongoose.model('Waitlist', WaitlistSchema);

export default Waitlist;