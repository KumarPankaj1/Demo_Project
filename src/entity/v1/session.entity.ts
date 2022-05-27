import {  Schema } from "mongoose";
import { tokenUtil } from "../../utils/jwt.utils";
import { interfaceSession } from "../../interfaces/session.interface";
import { SessionModel } from "../../models/session.model";
import {redis} from "../../config/redis.db";
import {User} from "../../utils/App.interface";
import {STATUS_MSG} from "../../constant/app.constant";
import Base from "../base.entity"

class sessionEntityClass<T> extends Base<T> {
    constructor() {
        super(SessionModel);
      }
    async create(userId: Schema.Types.ObjectId, data: interfaceSession.CreateData): Promise<string> {
      const session = await this.addValue({ userId, ...data });
      await redis.createSession(userId, data);
      return tokenUtil.generateAuthToken(
        {
          userId,
          sessionId: session._id,
          userType: session.userType,
        }
      );
 }


 async userLogout(tokenData: User, deviceId: string): Promise<any> {
    try {
      const userId = tokenData.userId;
      let msg = await redis.deleteSessionData(tokenData.userId, deviceId);
      const filter =  { userId, deviceId, isLoggedIn: true };
      const update = { isLoggedIn: false }
      let data = await this.update(filter,update);
      if(data){
        return msg;
      }
      else{
          return null;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async adminLogout(tokenData: User, deviceId: string): Promise<any> {
    try {
      const userId = tokenData.userId;
      let msg = await redis.deleteSessionData(tokenData.userId, deviceId);
      const filter =  { userId, deviceId, isLoggedIn: true };
      const update = { isLoggedIn: false }
      let data = await this.update(filter,update);
      if(data){
        return msg;
      }
      else{
          return null;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

}

 export const sessionEntity = new sessionEntityClass();