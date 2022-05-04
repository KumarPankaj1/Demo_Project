import { Request, Response, NextFunction } from "express";
import { DBENUMS, STATUS_MSG } from "../../constant/app.constant";
import { twilioService } from "../../services/twilio.service";
import { userEntity } from "../../entity/v1/user.entity";
import { sendErrorResponse } from "./../../utils/errorhandler";
import { sendResponse, SendErrorResponse } from "./../../utils/response";
import { IUser, IWorkExperience } from "../../interfaces/models.interface";
import { sessionService } from "../../services/session.service";

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
        let user: IUser | null = await userEntity.userExists(req.body);
        if (user) {
          const token = await sessionService.create(user._id, {
            deviceId: "0",
            deviceToken: "0",
            userType: DBENUMS.USERTYPE.USER,
          });
          sendResponse(
            res,
            STATUS_MSG.SUCCESS.USER_LOGGED_IN({ token: token })
          );
        } else {
          const user = await userEntity.userInsert(req.body);
          const token = await sessionService.create(user._id, {
            deviceId: "0",
            deviceToken: "0",
            userType: DBENUMS.USERTYPE.USER,
          });
          sendResponse(res, STATUS_MSG.SUCCESS.CREATED({ token: token }));
        }
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INVALID_CREDENTIALS);
      }
    } catch (err: any) {
      const errData: any = sendErrorResponse(err);
      SendErrorResponse(res, errData);
    }
  }

  async userProfileCreate(req: Request, res: Response): Promise<void> {
    try {
      let user: IUser | null = await userEntity.profileCreate(req.body,req.user);
      if (user) {
        sendResponse(res, STATUS_MSG.SUCCESS.USER_CREATED);
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      console.log(err);
      SendErrorResponse(res, err);
    }
  }

  async profilePicUpload(req: Request, res: Response): Promise<void> {
    try {
      let user: IUser | null = await userEntity.userImageUpload(
        req.user,
        req.file
      );
      if (user) {
        sendResponse(res, STATUS_MSG.SUCCESS.USER_IMAGE_UPLOADED);
      }
    } catch (err) {
      console.log(err);
      SendErrorResponse(res, err);
    }
  }

  async userWorkExperienceDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let details: IWorkExperience | null =
        await userEntity.createUserExperienceDetails(req.body,req.user);
      if (details) {
        sendResponse(
          res,
          STATUS_MSG.SUCCESS.USER_WORKEXPERIENCEDEATILS_CREATED
        );
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async userExperienceVideoUpload(req: Request, res: Response): Promise<void> {
    try {
      let updatedData: IWorkExperience | null =
        await userEntity.userVideoUpload(req.user, req.file);
      if (updatedData) {
        sendResponse(res, STATUS_MSG.SUCCESS.USER_VIDEO_UPLOADED);
      } else {
        sendResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      console.log(err);
      SendErrorResponse(res, err);
    }
  }
}

export const User = new userClass();
