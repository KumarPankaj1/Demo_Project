import { NextFunction, Request, Response } from "express";
import { DBENUMS, STATUS_MSG } from "../../constant/app.constant";
import { twilioService } from "../../services/twilio.service";
import { userEntity } from "../../entity/v1/user.entity";
import { sendErrorResponse } from "./../../utils/errorhandler";
import { sendResponse, SendErrorResponse } from "./../../utils/response";
import { tokenUtil } from "../../utils/jwt.utils";

class userClass {
  // UserType = DBENUMS.USERTYPE.USER;
  async userGenerateOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let response: any = await twilioService.generateOtp(req.body);
      if (response) {
        sendResponse(res, STATUS_MSG.SUCCESS.OTP_GENERATE_SUCCESFULLY);
      }
    } catch (err: any) {
      console.log(err);
      SendErrorResponse(res, err);
    }
  }

  async userLogin(req: Request, res: Response): Promise<void> {
    try {
      let response: any = await twilioService.verifyOtp(req.body);
      if (response.status == "approved") {
        let token = req.body.token;
        let user: any = await userEntity.userExists(req.body);
        if (user) {
          if (token === undefined) {
            const token = tokenUtil.generateAuthToken({
              _id: user._id,
            });
            sendResponse(
              res,
              STATUS_MSG.SUCCESS.USER_LOGGED_IN_SUCCESFULLY({ token: token })
            );
          } else {
            sendResponse(res, STATUS_MSG.ERROR.ALREADY_LOGGEDIN("user"));
          }
        } else {
          let user = await userEntity.userInsert(req.body);
          const token = tokenUtil.generateAuthToken({
            _id: user._id,
          });
          sendResponse(res, STATUS_MSG.SUCCESS.CREATED({ token: token }));
        }
      }
    } catch (err: any) {
      const errData: any = sendErrorResponse(err);
      SendErrorResponse(res, errData);
    }
  }

  async userProfileCreate(req: Request, res: Response): Promise<void> {
    try {
      let user: any = await userEntity.profileCreate(req.body);
      if (user) {
        sendResponse(res, STATUS_MSG.SUCCESS.USER_CREATED);
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err });
    }
  }

  async profilePicUpload(req: Request, res: Response): Promise<void> {
    try {
      let user: any = await userEntity.userImageUpload(req.body._id, req.file);

      if (user) {
        sendResponse(res, STATUS_MSG.SUCCESS.USER_IMAGE_UPLOADED);
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err });
    }
  }
}

export const User = new userClass();

// async userSignup(req: Request, res: Response): Promise<void> {
//   try {
//     let response: any = await twilioService.verifyOtp(req.body);
//     if (response.status == "approved") {
//       let user: any = await userEntity.userExists(req.body);
//       if (user) {
//         sendResponse(res, STATUS_MSG.ERROR.ALREADY_EXIST("Already"));
//       } else {
//         let user = await userEntity.userInsert(req.body);
//         const token = tokenUtil.generateAuthToken({
//           _id: user._id,
//           UserType: DBENUMS.USERTYPE.USER,
//         });
//         sendResponse(res, STATUS_MSG.SUCCESS.CREATED({ token: token }));
//       }
//     } else {
//       sendResponse(res, STATUS_MSG.ERROR.INVALID_CREDENTIALS);
//     }
//   } catch (err: any) {
//     const errData: any = sendErrorResponse(err);
//     SendErrorResponse(res, errData);
//   }
// }
