import AdminModel from "../../models/admin.model";
import {STATUS_MSG } from "../../constant/app.constant";
import { IAdmin } from "../../interfaces/models.interface";

class adminEntityClass {
  get Model() {
    return AdminModel;
  }

  async adminExists(payLoad: IAdmin): Promise<IAdmin | null> {
    try {
      const phoneNumber: number = payLoad.phoneNumber;
      const admin: IAdmin | null = await this.Model.findOne({ phoneNumber });
      return admin;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async userInsert(data: IAdmin): Promise<IAdmin> {
    try {
      let Data = new this.Model({
        phoneNumber: data.phoneNumber,
      });
      let admin: IAdmin = await Data.save();
      return admin;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async profileCreate(data: any,tokenData: any): Promise<IAdmin | null> {
    try {
      const admin: IAdmin | null = await this.Model.findByIdAndUpdate(
        tokenData.userId,
        {
          adminName: data.adminName,
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
          adminType: data.adminType,
        },
        {
          new: true,
        }
      );
      return admin;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async adminImageUpload(tokenData: any, file: any): Promise<IAdmin | null> {
    try {
      const admin: IAdmin | null = await this.Model.findByIdAndUpdate(
        tokenData.userId,
        {
          profileUrl: `http://localhost:${process.env.PORT}/${file?.filename}`,
        },
        {
          new: true,
        }
      );
      return admin;
    } catch (err) {
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }
}

export const adminEntity = new adminEntityClass();
