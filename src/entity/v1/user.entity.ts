import UserModel from "../../models/user.model";
import { STATUS_MSG } from "../../constant/app.constant";
import { IUser } from "../../interfaces/models.interface";
import { Types } from "mongoose";
import { User } from "../../utils/App.interface";
import Base from "../base.entity";
import { Schema } from "mongoose";

class userEntityClass<T> extends Base<T> {
  constructor() {
    super(UserModel);
  }

  async userExists(payLoad: IUser): Promise<IUser | null> {
    try {
      const phoneNumber: number = payLoad.phoneNumber;
      const user: IUser | null = await this.find({ phoneNumber });
      return user;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async userInsert(data: IUser): Promise<IUser> {
    try {
      let user: IUser = await this.addValue(data);
      return user;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async profileCreate(data: any, tokenData: User): Promise<IUser | null> {
    try {
      const _id: Schema.Types.ObjectId = tokenData.userId;
      const filter = { _id };
      const update = {
        username: data.username,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        emailAddress: data.emailAddress,
        location: {
          type: "Point",
          coordinates: [data.locLat, data.locLong],
        },
        disOfCurLoc: {
          type: "Point",
          coordinates: [data.disOfCurLocLat, data.disOfCurLocLong],
        },
        disOfPerLoc: {
          type: "Point",
          coordinates: [data.disOfPerLocLat, data.disOfPerLocLong],
        },
        userType: data.userType,
      };
      const user: IUser | null = await this.update(filter, update);
      return user;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async userImageUpload(tokenData: User, file: any): Promise<any> {
    try {
      const userId = tokenData.userId;
      const filter = { _id: userId };
      if (file?.filename === undefined) {
        return;
      }
      const update = {
        profileUrl: `http://${process.env.HOST}:${process.env.PORT}/${file?.filename}`,
        // profileUrl: data.profileUrl,
      };
      const user: IUser | null = await this.update(filter, update);
      return user;
    } catch (err: any) {
      console.log(err.message);

      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async getUserDetails(tokenData: any): Promise<any> {
    try {
      const id = tokenData.userId;
      const data = await this.getModel().aggregate([
        {
          $match: { _id: new Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "experiences",
            localField: "_id",
            foreignField: "userId",
            as: "EducationAndWorkDetails",
          },
        },
        {
          $project: {
            userType: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
            "EducationAndWorkDetails.isPreviousWorkExperience": 0,
            "EducationAndWorkDetails.preferredLocation": 0,
            "EducationAndWorkDetails.workLookingFor": 0,
            "EducationAndWorkDetails.userId": 0,
            "EducationAndWorkDetails.createdAt": 0,
            "EducationAndWorkDetails.updatedAt": 0,
            "EducationAndWorkDetails.__v": 0,
            "EducationAndWorkDetails.videoUrl": 0,
            "EducationAndWorkDetails.jobCategory": 0,
            "EducationAndWorkDetails.expectedSalary": 0,
          },
        },
      ]);
      return data;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async updateUserDetails(tokenData: User, data: any): Promise<boolean> {
    const _id = tokenData.userId;
    const filter = { _id };
    let update: any = {};
    console.log(data);

    if (data.locLat & data.locLong) {
      update.location = {
        type: "Point",
        coordinates: [data.locLat, data.locLong],
      };
    }
    if (data.disOfCurLocLat & data.disOfCurLocLong) {
      update.disOfCurLoc = {
        type: "Point",
        coordinates: [data.disOfCurLocLat, data.disOfCurLocLong],
      };
    }
    if (data.disOfPerLocLat & data.disOfPerLocLong) {
      update.disOfCurLoc = {
        type: "Point",
        coordinates: [data.disOfPerLocLat, data.disOfPerLocLong],
      };
    }
    (update.username = data.username),
      (update.dateOfBirth = data.dateOfBirth),
      (update.gender = data.gender),
      (update.emailAddress = data.emailAddress),
      (update.userType = data.userType);
    const status: IUser | null = await this.getModel().update(filter, update);
    if (status) {
      return true;
    } else {
      return false;
    }
  }
  catch(err: any) {
    console.log(err);
    return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
  }
}

export const userEntity = new userEntityClass();
