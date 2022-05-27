import userExperienceModel from "../../models/workexperience.model";
import { STATUS_MSG } from "../../constant/app.constant";
import {IWorkExperience } from "../../interfaces/models.interface";
import { User } from "../../utils/App.interface";
import Base from "../base.entity";

class userExperienceClass<T> extends Base<T> {
  constructor() {
    super(userExperienceModel);
  }

  async createUserExperienceDetails(
    data: IWorkExperience,
    tokenData: User
  ): Promise<IWorkExperience> {
    try {
      data.userId = tokenData.userId;
      let doc: IWorkExperience = await this.addValue(data);
      return doc;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async userVideoUpload(
    tokenData: User,
    data: any
  ): Promise<IWorkExperience | null> {
    try {
      const userId = tokenData.userId;
      const filter = {userId};
      const update = {
        videoUrl: data.videoUrl,
      };
      const Data: IWorkExperience | null =
        await this.update(filter, update);
      return Data;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }
}

export const userExperienceEntity = new userExperienceClass();
