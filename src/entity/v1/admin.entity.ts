import AdminModel from "../../models/admin.model";
import { STATUS_MSG } from "../../constant/app.constant";
import { IAdmin } from "../../interfaces/models.interface";
import { User } from "../../utils/App.interface";
import Base from "../base.entity";

class adminEntityClass<T> extends Base<T> {
  constructor() {
    super(AdminModel);
  }

  async adminExists(payLoad: IAdmin): Promise<IAdmin | null> {
    try {
      const phoneNumber: number = payLoad.phoneNumber;
      const admin: IAdmin | null = await this.find({ phoneNumber });
      return admin;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async adminInsert(data: IAdmin): Promise<IAdmin> {
    try {
      let admin: IAdmin = await this.addValue(data);
      return admin;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async profileCreate(data: any, tokenData: User): Promise<IAdmin | null> {
    try {
      const _id = tokenData.userId;
      const filter = { _id };
      const update = {
        adminName: data.adminName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        emailAddress: data.emailAddress,
        location: {
          type: "Point",
          coordinates: [data.locLat, data.locLong],
        },
        disOfCurLoc: {
          type: "Point",
          coordinates: [
            data.disOfCurLocLat,
            data.disOfCurLocLong,
          ],
        },
        disOfPerLoc: {
          type: "Point",
          coordinates: [
            data.disOfPerLocLat,
            data.disOfPerLocLong,
          ],
        },
        adminType: data.adminType,
      };
      const admin: IAdmin | null = await this.update(filter, update);
      return admin;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async updateAdminDetails(tokenData: User, data: any): Promise<boolean> {
    const _id = tokenData.userId;
    const filter = { _id };
    let update: any = {};
    if (data.loclat & data.loclong) {
      update.location = {
        type: "Point",
        coordinates: [data.loclat, data.loclong],
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
    (update.adminName = data.adminName),
      (update.dateOfBirth = data.dateOfBirth),
      (update.gender = data.gender),
      (update.emailAddress = data.emailAddress),
      (update.adminType = data.adminType);
    const status: IAdmin | null = await this.getModel().update(filter, update);
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

  async adminImageUpload(tokenData: User, data: any): Promise<IAdmin | null> {
    try {
      const adminId = tokenData.userId;
      const filter = { _id: adminId };
      const update = {
        profileUrl: data.profileUrl,
      };
      const admin: IAdmin | null = await this.update(filter, update);
      return admin;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }
}

export const adminEntity = new adminEntityClass();
