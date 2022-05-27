import {Request,Response, NextFunction} from 'express';


export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.user);
    if (req.user.userType!== "admin") {
      return res.status(400).json({ message: "Admin Access denied" });
    }
    next();
  };