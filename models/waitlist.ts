import mongoose, { Document, Model, Schema } from 'mongoose';
import { IWaitlist } from '../types/waitlist';

export interface IWaitlistDocument extends IWaitlist, Document {}

const WaitlistSchema = new Schema<IWaitlistDocument>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // This automatically creates an index
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
  },
  {
    autoIndex: process.env.NODE_ENV === 'development',
    timestamps: true
  }
);

// Create additional indexes if in development mode
if (process.env.NODE_ENV === 'development') {
  // Only create indexes for status and createdAt
  WaitlistSchema.index({ status: 1 });
  WaitlistSchema.index({ createdAt: 1 });
}

// Create the model
const Waitlist = (mongoose.models.Waitlist as Model<IWaitlistDocument>) || 
  mongoose.model<IWaitlistDocument>('Waitlist', WaitlistSchema);

export default Waitlist;