import UserModel from "../../models/user.model";
import userExperienceModel from "../../models/workexperience.model";
import { STATUS_MSG } from "../../constant/app.constant";
import { IUser, IWorkExperience } from "../../interfaces/models.interface";
import { Types } from "mongoose";

class userEntityClass {
  get Model() {
    return UserModel;
  }

  async userExists(payLoad: IUser): Promise<IUser | null> {
    try {
      const phoneNumber: number = payLoad.phoneNumber;
      const user: IUser | null = await this.Model.findOne({ phoneNumber });
      return user;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async userInsert(data: IUser): Promise<IUser> {
    try {
      let Data = new this.Model({
        phoneNumber: data.phoneNumber,
      });
      let user: IUser = await Data.save();
      return user;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async profileCreate(data: any, tokenData: any): Promise<IUser | null> {
    try {
      const user: IUser | null = await this.Model.findByIdAndUpdate(
        tokenData.userId,
        {
          username: data.username,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          location: {
            type: "Point",
            coordinates: [data.locationLattitude, data.locationLongitude],
          },
          districtOfCurrentLocation: {
            type: "Point",
            coordinates: [
              data.districtOfCurrentLocationLattitude,
              data.districtOfCurrentLocationLongitude,
            ],
          },
          districtOfPermanentLocation: {
            type: "Point",
            coordinates: [
              data.districtOfPermanentLocationLattitude,
              data.districtOfPermanenttLocationLongitude,
            ],
          },
          userType: data.userType,
        },
        {
          new: true,
        }
      );
      return user;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async userImageUpload(tokenData: any, file: any): Promise<IUser | null> {
    try {
      const user: IUser | null = await this.Model.findByIdAndUpdate(
        tokenData.userId,
        {
          profileUrl: `http://localhost:${process.env.PORT}/${file?.filename}`,
        },
        {
          new: true,
        }
      );
      return user;
    } catch (err) {
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async createUserExperienceDetails(
    data:IWorkExperience,
    tokenData: any
  ): Promise<IWorkExperience | null> {
    try {
      data.userId = tokenData.userId;
      let Data = new userExperienceModel(data);
      let user: IWorkExperience | null = await Data.save();
      return user;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async userVideoUpload(tokenData: any, file: any): Promise<IWorkExperience | null> {
    try {
      const userId: Types.ObjectId = tokenData.userId;
      const user: IWorkExperience | null =
        await userExperienceModel.findOneAndUpdate(
          userId,
          {
            videoUrl: `http://localhost:${process.env.PORT}/${file?.filename}`,
          },
          {
            new: true,
          }
        );
      return user;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }
}

export const userEntity = new userEntityClass();
