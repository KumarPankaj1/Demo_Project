import express, { Application, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { STATUS_MSG } from "../../constant/app.constant";
import { userService } from "../../controller/v1/user.controller";
const app: Application = express();
app.use(express.json());

class userClass {
  async userGenerateOtp(req: Request, res: Response): Promise<void> {
    try {
      let userdata: any = await userService.userGenerateOtp(req.body);
      if (userdata) {
        res.status(200).json({ message: userdata });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE);
    }
  }

  async userSignup(req: Request, res: Response): Promise<void> {
    try {
      let response: any = await userService.verifyOtp(req.body);
      if (response.status == "approved") {
        let userdata: any = await userService.userSignup(req.body);
        let token = userdata.token;
        let user = userdata.user;
        if (token) {
          res.cookie("jwt", token);
        }
        if (user) {
          res.status(200).json({ message: "signup succesfully" });
        }
      } else {
        res.status(401).send({ message: "Invalid OTP!" });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err });
    }
  }

  async userLogin(req: Request, res: Response): Promise<void> {
    try {
      let response: any = await userService.verifyOtp(req.body);
      if (response.status == "approved") {
        let token = req.cookies.jwt;
        let userdata: any = await userService.userLogin(req.body, token);
        let newtoken = userdata.newtoken;
        let user = userdata.user;
        if (newtoken) {
          res.cookie("jwt", newtoken);
        }
        if (user) {
          res.status(200).json({ message: "login succesfully" });
        }
      } else {
        res.status(401).send({ message: "Invalid OTP!" });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err });
    }
  }

  async userProfileCreate(req: Request, res: Response): Promise<void> {
    try {
       console.log(req.body);
      // console.log(req.body.id);
      let user: any = await userService.userProfileCreate(
        req.body.id,
        req.body
      );
       console.log(user);
      if (user) {
        res.status(200).json({ message: "profile created successfully" });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err });
    }
  }

  async userImageUpload(req: Request, res: Response): Promise<void> {
    try {
      let user: any = await userService.userImageUpload(req.body.id, req.file);
      console.log(user);

      if (user) {
        res.status(200).json({ message: "image upload successfully" });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err });
    }
  }
}

export const User = new userClass();

