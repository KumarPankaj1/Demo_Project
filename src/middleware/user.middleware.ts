import {Request,Response, NextFunction} from 'express';


export const userMiddleware = (req: Request, res: Response,next: NextFunction) => {
    // console.log(req.user)
    if(req.user.userType !== 'user'){
      return res.status(400).json({ message: 'User Access denied' })
    }
    next();
  }
