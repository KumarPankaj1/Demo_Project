import { FilterQuery, ObjectId, Types } from "mongoose";
import { DBENUMS} from '../constant/app.constant';
import { tokenUtil } from "../utils/jwt.utils";
import { ISession } from "../interfaces/models.interface";
import { SessionModel } from "../models/session.model";
import {redis} from "../config/redis.db"

class SessionService {
    get Model() {
      return SessionModel;
    }
    async create(userId: ObjectId, data: ISession.CreateData): Promise<string> {
      const session = await this.Model.create({ userId, ...data });
      await redis.createSession(session.userId.toString(), session._id);
      return tokenUtil.generateAuthToken(
        {
          userId,
          sessionId: session._id,
          type: DBENUMS.USERTYPE.USER,
        },
        DBENUMS.USERTYPE.USER
      );
 }}

 export const sessionService = new SessionService();