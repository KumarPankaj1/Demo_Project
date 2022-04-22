import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

const auth_Login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
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
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let token: any = req.headers["authorization"];
    console.log(token);
    
    const verifyUser: any = jwt.verify(token, <string>process.env.SECRET_KEY);
    req.body.id = verifyUser._id;
    next();
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

const storage = multer.diskStorage({
  destination: `${__dirname}/../uploads/public`,
  filename: (req: any, file: any, cb: any) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

export { upload, auth, auth_Login };

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
