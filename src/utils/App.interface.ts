import { Schema } from 'mongoose';

export type User = { 
    userId:Schema.Types.ObjectId,
    userType:string,
}
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
