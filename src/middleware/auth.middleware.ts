import { Request, Response, NextFunction } from "express";
import { STATUS_MSG } from "../constant/app.constant";
import { SessionModel } from "../models/session.model";
import { interfaceSession } from "../interfaces/session.interface";
import { redis } from "../config/redis.db";
import { tokenUtil } from "../utils/jwt.utils";
import { SendErrorResponse } from "../utils/response";

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) {
      throw new Error("Token missing");
    }
    const tokenData = await tokenUtil.verifyToken(token);
    if (tokenData && tokenData.userId) {
      const details: interfaceSession.tokenDetails = await redis.findSession(
        tokenData.userId
      );
      if (details) {
        req.user = tokenData;
        next();
      } else {
        const sessions: interfaceSession.ISession | null =
          await SessionModel.findById(tokenData.sessionId);
        if (sessions?.isActive == true && sessions.isLoggedIn == true) {
          req.user = tokenData;
          next();
        } else if (sessions == null || sessions.isLoggedIn == false) {
          SendErrorResponse(res, STATUS_MSG.ERROR.SESSION_EXPIRED);
        } else {
          SendErrorResponse(res, STATUS_MSG.ERROR.BLOCKED_ACCOUNT);
        }
      }
    }
  } catch (err: any) {
    SendErrorResponse(
      res,
      STATUS_MSG.ERROR.MISSINING_AUTHENTICATION(err.message)
    );
  }
}
