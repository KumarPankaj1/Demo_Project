import { Request, Response, NextFunction } from "express";
import { DBENUMS, STATUS_MSG } from "../../constant/app.constant";
import { twilioService } from "../../services/twilio.service";
import { userEntity } from "../../entity/v1/user.entity";
import { userExperienceEntity } from "../../entity/v1/workExperience.entity";
import { sendErrorResponse } from "./../../utils/errorhandler";
import { sendResponse, SendErrorResponse } from "./../../utils/response";
import { IUser, IWorkExperience } from "../../interfaces/models.interface";
import { sessionEntity } from "../../entity/v1/session.entity";

class userClass {
  // UserType = DBENUMS.USERTYPE.USER;
  async userGenerateOtp(req: Request, res: Response): Promise<void> {
    try {
      let response: any = await twilioService.generateOtp(req.body);
      if (response) {
        sendResponse(res, STATUS_MSG.SUCCESS.OTP_GENERATE_SUCCESFULLY);
      }
    } catch (err: any) {
      if ((err.status == 429 && err.message == "Too many requests") || (err.status == 401 && err.message == "Authenticate") ) {
        sendResponse(res, STATUS_MSG.SUCCESS.OTP_GENERATE_SUCCESFULLY);
      } else {
        SendErrorResponse(res, err);
      }
    }
  }

  async userLogin(req: Request, res: Response): Promise<void> {
    try {
      let response: any = await twilioService.verifyOtp(req.body);
      if (response.status == "approved") {
        let user: IUser | null = await userEntity.userExists(req.body);
        if (user) {
          const token = await sessionEntity.create(user._id, {
            deviceId: (req.headers.deviceid as string),
            deviceToken: (req.headers.devicetoken as string) || "0",
            userType: "user",
          });
          sendResponse(
            res,
            STATUS_MSG.SUCCESS.USER_LOGGED_IN({ token: token })
          );
        } else {
          const user = await userEntity.userInsert(req.body);
          const token = await sessionEntity.create(user._id, {
            deviceId: (req.headers.deviceid as string),
            deviceToken: (req.headers.devicetoken as string) || "0",
            userType: "user",
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
      let user: IUser | null = await userEntity.profileCreate(
        req.body,
        req.user
      );
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
      console.log("yahatak");
      
      let user: IUser | null = await userEntity.userImageUpload(
        req.user,
        req.file
      );
      console.log(user);
      
      if (user) {
        sendResponse(res, STATUS_MSG.SUCCESS.USER_IMAGE_UPLOADED);
      }
       else {
        SendErrorResponse(res, STATUS_MSG.ERROR.IMAGE_NOT_PROVIDED);
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
      let data: IWorkExperience | null =
        await userExperienceEntity.createUserExperienceDetails(
          req.body,
          req.user
        );
      if (data) {
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
        await userExperienceEntity.userVideoUpload(req.user, req.body);
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

  async getUserDetails(req: Request, res: Response): Promise<void> {
    try {
      let data = await userEntity.getUserDetails(req.user);
      if (data) {
        sendResponse(res, STATUS_MSG.SUCCESS.GET_SUCCESS(data));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async updateUserDetails(req: Request, res: Response): Promise<void> {
    try {
      let status = await userEntity.updateUserDetails(req.user, req.body);
      if (status) {
        sendResponse(res, STATUS_MSG.SUCCESS.UPDATE_SUCCESS({}));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async userLogout(req: Request, res: Response): Promise<void> {
    try {
      let msg = await sessionEntity.userLogout(
        req.user,
        req.headers.deviceid as string
      );
      if (msg) {
        sendResponse(res, STATUS_MSG.SUCCESS.LOGOUT_SUCCESS({}));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }
}

export const User = new userClass();
