export type User = { 
    userId:string
}
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
