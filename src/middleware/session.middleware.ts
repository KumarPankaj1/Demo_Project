import { Request, Response, NextFunction } from "express";
import { STATUS_MSG } from "../constant/app.constant";
import { SessionModel } from "../models/session.model";
import { redis } from "../config/redis.db";
import { sendResponse, SendErrorResponse } from "../utils/response";
import { interfaceSession } from "../interfaces/session.interface";

export const checkSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let deviceId: string = req.headers.deviceid as string;
    let i;
    let data: interfaceSession.ISession[] = await redis.findSession(
      req.user.userId
    );
    for (i = 0; i < data.length; i++) {
      if (data[i].deviceId === deviceId) {
        break;
      }
    }
    if (i == data.length) {
      let details: interfaceSession.ISession | null =
        await SessionModel.findOne({
          userId: req.user.userId,
          deviceId,
          isLoggedIn: true,
        });
      if (details) {
        let sessionDetails: interfaceSession.CreateData= {
          deviceId: details.deviceId,
          deviceToken: details.deviceToken,
          userType: details.userType,
        };
        await redis.setSession(req.user.userId, sessionDetails);
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.UNAUTHORIZED);
      }
    } else {
      next();
    }
  } catch (err: any) {
    SendErrorResponse(res, STATUS_MSG.ERROR.DB_ERROR);
  }
};
