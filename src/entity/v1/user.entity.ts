import express, { Application, NextFunction, Request, Response } from "express";
import { STATUS_MSG } from "../../constant/app.constant";
import { userService } from "../../controller/v1/user.controller";
import { sendErrorResponse } from "./../../utils/errorhandler";
const app: Application = express();
app.use(express.json());

class userClass {
  async userGenerateOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let userdata: any = await userService.userGenerateOtp(req.body);
      if (userdata) {
        res.status(userdata.statusCode).json(userdata);
      }
    } catch (err: any) {
      console.log(err);
      res.status(err.statusCode).json(err);
    }
  }

  async userSignup(req: Request, res: Response): Promise<void> {
    try {
      let response: any = await userService.verifyOtp(req.body);
      if (response.status == "approved") {
        let statusData: any = await userService.userSignup(req.body);
        if (statusData) {
          res.status(statusData.statusCode).json(statusData);
        }
      } else {
        let statusdata: any = STATUS_MSG.ERROR.INVALID_CREDENTIALS;
        res.status(statusdata.statusCode).send(statusdata);
      }
    } catch (err: any) {
      console.log(err);
      res.status(400).json({ message: err });
    }
  }

  async userLogin(req: Request, res: Response): Promise<void> {
    try {
      let response: any = await userService.verifyOtp(req.body);
      if (response.status == "approved") {
        let token = req.body.token;
        let statusData: any = await userService.userLogin(req.body, token);
        if (statusData) {
          res.status(statusData.statusCode).json(statusData);
        }
      } else {
        let statusdata: any = STATUS_MSG.ERROR.INVALID_CREDENTIALS;
        res.status(statusdata.statusCode).send(statusdata);
      }
    } catch (err: any) {
      const errData: any = sendErrorResponse(err);
      res.status(errData.statusCode).json(errData);
    }
  }

  async userProfileCreate(req: Request, res: Response): Promise<void> {
    try {
      let statusData: any = await userService.userProfileCreate(
        req.body.id,
        req.body
      );
      if (statusData) {
        res.status(statusData.statusCode).json(statusData);
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err });
    }
  }

  async userImageUpload(req: Request, res: Response): Promise<void> {
    try {
      let statusData: any = await userService.userImageUpload(
        req.body.id,
        req.file
      );

      if (statusData) {
        res.status(statusData.statusCode).json(statusData);
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err });
    }
  }
}

export const User = new userClass();
