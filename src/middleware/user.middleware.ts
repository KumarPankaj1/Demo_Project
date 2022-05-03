import { Request, Response, NextFunction,} from "express";
import { STATUS_MSG } from "../constant/app.constant";
import { SessionModel } from "../models/session.model";
import { interfaceSession } from "../interfaces/session.interface";
import jwt from "jsonwebtoken";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) {
      throw new Error("Token required for validation");
    }
    const tokenData: any = jwt.verify(token, <string>process.env.SECRET_KEY);
    req.user = tokenData;
    const sessions: interfaceSession.ISession | null =
      await SessionModel.findById(tokenData.sessionId);
    if (sessions?.isActive == true && sessions.isLoggedIn == true) {
      // req.body.id = sessions.userId;
      if (req.user?.userId == undefined) {
        res.status(404).json({ message: "missing id" });
      } else {
        next();
      }
    } else if (sessions == null || sessions.isLoggedIn == false) {
      res
        .status(403)
        .json(
          STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE(
            "Please login, session expired"
          )
        );
    } else {
      res.status(403).json(STATUS_MSG.ERROR.BLOCKED_ACCOUNT);
    }
  } catch (err: any) {
    res
      .status(401)
      .json(STATUS_MSG.ERROR.MISSINING_AUTHENTICATION(err.message));
  }
};

//with the help of Bearer

// const auth = (req:express.Request, res: express.Response,next:express.NextFunction) => {
//     let token = req.headers['authorization'];
//     if(token==undefined){
//          res.status(401).json({error:"token is not present"})
//         //next();
//     }
//     if(token?.startsWith("Bearer")){
//         token = token.slice(7,token.length);
//     }
//     if(token){
//         jwt.verify(token,'Pankaj Parmar',(err,decoded) => {
//             if(err){
//                  res.json({
//                     success: false,
//                     message:"token is not correct"
//                 });
//             }
//             else{
//                 req.body.decoded=decoded;
//                 //next();
//             }
//         });
//     }
//     else{
//          res.status(401).json({
//             success: false,
//             error:"token is not"
//         })
//     }
// }
