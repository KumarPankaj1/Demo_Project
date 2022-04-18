import express, { Application, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { STATUS_MSG } from "../../constant/app.constant";
import { adminService } from "../../controller/v1/admin.controller";
const app: Application = express();
app.use(express.json());

class adminClass {

    async adminGenerateOtp(req: Request, res: Response): Promise<void>{
        try{
            let admindata:any = await adminService.adminGenerateOtp(req.body)
             if(admindata=='response') {
                res.status(200).json({ message: admindata})
             }   
            
        }catch(err){
           if(err == 'INVALID CREDENTIALS'){
               res.status(400).json({
               message: "Wrong phone number :(",
               phonenumber: req.body.PhoneNumber,
             });
           }
           else{
           console.log(err);
           res.status(404).json(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE);
           }
        }}

  async adminLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let data: any = await adminService.adminlogin(req.body, req.file);
      if ((data = "adminExist")) {
        res.status(200).json({ message: "admin already exist" });
      } else {
        let token = data.token;
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 300000),
        });
        let user = data.user;
        if (user) {
          res.status(200).json({ message: "login successful" });
        }
      }
    } catch (err: any) {
      if (err == "invalid credentials") {
        res.status(400).send({
          message: "Wrong phone number or code :(",
          phonenumber: req.body.phonenumber,
        });
      } else {
        if (err == err.a) {
          console.log(err);
          res.status(404).json(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE);
        }
        if (err == err.b) {
          console.log(err);
          res.status(400).json(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE);
        }
      }
    }
  }
}

export const Admin = new adminClass();
