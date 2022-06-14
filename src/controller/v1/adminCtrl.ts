import { Request, Response} from "express";
import { DBENUMS, STATUS_MSG } from "../../constant/app.constant";
import { twilioService } from "../../services/twilio.service";
import { adminEntity } from "../../entity/v1/admin.entity";
import { sendErrorResponse } from "./../../utils/errorhandler";
import { sendResponse, SendErrorResponse } from "./../../utils/response";
import { IAdmin} from "../../interfaces/models.interface";
import { sessionEntity } from "../../entity/v1/session.entity";

class adminClass {
  // UserType = DBENUMS.USERTYPE.USER;
  async adminGenerateOtp(req: Request, res: Response): Promise<void> {
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
          const token = await sessionEntity.create(admin._id, {
            deviceId: req.headers.deviceid as string || "0",
            deviceToken: req.headers.devicetoken as string || "0",
            userType: "admin",
          });
          sendResponse(
            res,
            STATUS_MSG.SUCCESS.USER_LOGGED_IN({ token: token })
          );
        } else {
          const admin = await adminEntity.adminInsert(req.body);
          const token = await sessionEntity.create(admin._id, {
            deviceId: req.headers.deviceid as string || "0",
            deviceToken: req.headers.devicetoken as string || "0", 
            userType: "admin",
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

  async adminProfileCreate(req: Request, res: Response): Promise<void> {
    try {
      let admin: IAdmin | null = await adminEntity.profileCreate(
        req.body,
        req.user
      );
      if (admin) {
        sendResponse(res, STATUS_MSG.SUCCESS.ADMIN_CREATED);
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
        req.user,
        req.file
      );
      if (admin) {
        sendResponse(res, STATUS_MSG.SUCCESS.ADMIN_IMAGE_UPLOADED);
      }
    } catch (err) {
      console.log(err);
      SendErrorResponse(res, err);
    }
  }



  async updateAdminDetails(req: Request, res: Response): Promise<void> {
    try {
      let status = await adminEntity.updateAdminDetails(req.user, req.body);
      if (status) {
        sendResponse(res, STATUS_MSG.SUCCESS.UPDATE_SUCCESS({}));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async adminLogout(req: Request, res: Response): Promise<void> {
    try {
      let msg = await sessionEntity.adminLogout(req.user,req.headers.deviceid as string);
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

export const Admin = new adminClass();
