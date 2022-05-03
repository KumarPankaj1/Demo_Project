import { Request, Response, NextFunction } from "express";
import { DBENUMS, STATUS_MSG } from "../../constant/app.constant";
import { twilioService } from "../../services/twilio.service";
import { adminEntity } from "../../entity/v1/admin.entity";
import { sendErrorResponse } from "./../../utils/errorhandler";
import { sendResponse, SendErrorResponse } from "./../../utils/response";
import { IAdmin} from "../../interfaces/models.interface";
import { sessionService } from "../../services/session.service";

class adminClass {
  // UserType = DBENUMS.USERTYPE.USER;
  async adminGenerateOtp(
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

  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      let response: any = await twilioService.verifyOtp(req.body);
      if (response.status == "approved") {
        let admin: IAdmin | null = await adminEntity.adminExists(req.body);
        if (admin) {
          const token = await sessionService.create(admin._id, {
            deviceId: "0",
            deviceToken: "0",
            userType: DBENUMS.USERTYPE.USER,
          });
          sendResponse(
            res,
            STATUS_MSG.SUCCESS.USER_LOGGED_IN({ token: token })
          );
        }
      } else {
        const admin = await adminEntity.userInsert(req.body);
        const token = await sessionService.create(admin._id, {
          deviceId: "0",
          deviceToken: "0",
          userType: DBENUMS.USERTYPE.USER,
        });
        sendResponse(res, STATUS_MSG.SUCCESS.CREATED({ token: token }));
      }
    } catch (err: any) {
      const errData: any = sendErrorResponse(err);
      SendErrorResponse(res, errData);
    }
  }

  async adminProfileCreate(req: Request, res: Response): Promise<void> {
    try {
      let admin: IAdmin | null = await adminEntity.profileCreate(req.body);
      if (admin) {
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
      let admin: IAdmin | null = await adminEntity.adminImageUpload(
        req.body._id,
        req.file
      );
      if (admin) {
        sendResponse(res, STATUS_MSG.SUCCESS.USER_IMAGE_UPLOADED);
      }
    } catch (err) {
      console.log(err);
      SendErrorResponse(res, err);
    }
  }  
}

export const Admin = new adminClass();
