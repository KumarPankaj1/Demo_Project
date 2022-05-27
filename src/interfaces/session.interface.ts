import { Types } from "mongoose";

export namespace interfaceSession {
  export interface ISession {
    deviceToken: string;
    isActive: boolean;
    isLoggedIn: boolean;
    userId: Types.ObjectId;
    deviceId: string;
    userType:string;
  }
  export interface CreateData {
    deviceId: string;
    deviceToken: string;
    userType:string;
  }
 
  export interface tokenDetails {
    userId?: Types.ObjectId;
    sessionId: Types.ObjectId;
    userType:string;
  }
  export interface token{
    userId: Types.ObjectId;
    sessionId: Types.ObjectId;
  }
  export interface validationInterface{
    userType:string;

  }
  
}
