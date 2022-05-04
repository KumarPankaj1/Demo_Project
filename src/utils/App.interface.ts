import { Schema } from 'mongoose';

export type User = { 
    userId:Schema.Types.ObjectId
}
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
