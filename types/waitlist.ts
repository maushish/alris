export interface IWaitlist {
    email: string;
    createdAt: Date;
    status: 'pending' | 'approved' | 'rejected';
    source: string;
    ip?: string;
    userAgent?: string;
  }