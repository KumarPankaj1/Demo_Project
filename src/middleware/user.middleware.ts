import multer from "multer";
import path from "path";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const auth_Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token:any = req.headers["authorization"];
    req.body.token = token;
    if (token == undefined) {
      next();
    } else {
      const verifyUser = jwt.verify(token, <string>process.env.SECRET_KEY);
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token:any = req.headers["authorization"];
    const verifyUser: any = jwt.verify(token, <string>process.env.SECRET_KEY);
    req.body._id = verifyUser._id;
    console.log(process.cwd());
    
    next();
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

const storage = multer.diskStorage({
  destination: `./uploads/public`,
  // console.log(process.cwd());
  
  filename: (req: any, file: any, cb: any) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
// console.log(process.cwd());

const upload = multer({
  storage: storage,
});

export { upload, auth, auth_Login };


// import { STATUS_MSG } from "../constant/app.constant";
// import { SessionModel } from "../models/session.model";
// import { redis } from "../config/redis.db";
// import { ISession } from "../interfaces/models.interface";

// export default async function session(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const token: string | undefined = req.headers.authorization;
//     if (!token) {
//       throw new Error("Token required for validation");
//     }
//     const tokenData:any = jwt.verify(token, <string>process.env.SECRET_KEY);
//     if (tokenData && tokenData.userId) {
//       const details: ISession.tokenDetails = await redis.findSession(
//         tokenData.userId
//       );

//       if (details && details.sessionId == tokenData.sessionId) {
//         req.body.idFromAuth = tokenData.userId;
//         next();
//       } else {
//         const sessions: ISession | null =await SessionModel.findById(tokenData.sessionId);
//         if (sessions?.isActive == true && sessions.isLoggedIn == true) {
//           req.body.idFromAuth = sessions.userId;
//           next();
//         } else if (sessions == null || sessions.isLoggedIn == false) {
//           res
//             .status(403)
//             .json(
//               STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE(
//                 "Please login, session expired"
//               )
//             );
//         } else {
//           res.status(403).json(STATUS_MSG.ERROR.BLOCKED_ACCOUNT);
//         }
//       }
//     }
//   } catch (err: any) {
//     res
//       .status(401)
//       .json(STATUS_MSG.ERROR.MISSINING_AUTHENTICATION(err.message));
//   }
// }


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

// export {
//     auth
// }
