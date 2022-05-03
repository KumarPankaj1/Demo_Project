import {  Schema } from "mongoose";
import { tokenUtil } from "../utils/jwt.utils";
import { interfaceSession } from "../interfaces/session.interface";
import { SessionModel } from "../models/session.model";

class SessionService {
    get Model() {
      return SessionModel;
    }
    async create(userId: Schema.Types.ObjectId, data: interfaceSession.CreateData): Promise<string> {
      const session = await this.Model.create({ userId, ...data });
      return tokenUtil.generateAuthToken(
        {
          userId,
          sessionId: session._id,
          type: session.userType,
        }
      );
 }}

 export const sessionService = new SessionService();