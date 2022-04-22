import express, { Application, Request, Response } from "express";
import User from "../../models/user.model";
import jwt from "jsonwebtoken";
import { DBENUMS, STATUS_MSG } from "../../constant/app.constant";

const app: Application = express();
app.use(express.json());

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

class userServiceClass {
  async userGenerateOtp(data: any) {
    try {
      if (data.PhoneNumber) {
        const response = await client.verify
          .services(process.env.SERVICE_ID)
          .verifications.create({
            to: `+${data.PhoneNumber}`,
            // channel: req.body.channel,
            channel: "sms",
          });
        return Promise.resolve(STATUS_MSG.SUCCESS.OTP_GENERATE_SUCCESFULLY);
      }
    } catch (err:any) {
      return Promise.reject(STATUS_MSG.ERROR.INVALID_PHONENUMBER);
    }
  }

  async verifyOtp(data: any) {
    try {
      if (data.PhoneNumber && data.code.length === 4) {
        const response = await client.verify
          .services(process.env.SERVICE_ID)
          .verificationChecks.create({
            to: `+${data.PhoneNumber}`,
            code: data.code,
          });
         
        return Promise.resolve(response);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // async loginVerifyOtp(data: any) {
  //   try {
  //     const userExist = await User.findOne({
  //       PhoneNumber: data.PhoneNumber,
  //     });
  //     if(userExist) {
  //     if (data.code.length === 4) {
  //       const response = await client.verify
  //         .services(process.env.SERVICE_ID)
  //         .verificationChecks.create({
  //           to: `+${data.PhoneNumber}`,
  //           code: data.code,
  //         });
  //       return Promise.resolve(response);
  //     }}
  //     else{
  //       return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST("user"));
  //     }
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // }

  async userSignup(data: any) {
    try {
      const userExist = await User.findOne({
        PhoneNumber: data.PhoneNumber,
      });
      if (userExist) {
        return Promise.reject(STATUS_MSG.ERROR.ALREADY_EXIST("Already"));
      }
      let Data = new User({
        PhoneNumber: data.PhoneNumber,
        UserType: data.UserType,
      });
      let user: any = await Data.save();
      let token = jwt.sign({ _id: user._id }, <string>process.env.SECRET_KEY);
      const statusData = STATUS_MSG.SUCCESS.CREATED({ token: token });
      return Promise.resolve(statusData);
    } catch (err) {
      return Promise.reject(STATUS_MSG.ERROR.INCORECT_INFORMATION);
    }
  }

  async userLogin(data: any, token: any) {
    try {
      const user = await User.findOne({ PhoneNumber: data.PhoneNumber });
      if (user) {
        if (token === undefined) {
          let newtoken = jwt.sign(
            { _id: user._id },
            <string>process.env.SECRET_KEY
          );
          return Promise.resolve(STATUS_MSG.SUCCESS.USER_LOGGED_IN_SUCCESFULLY({newtoken:newtoken}));
        } else {
          return Promise.reject(STATUS_MSG.ERROR.ALREADY_LOGGEDIN("user"));
        }
      } else {
        return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST("user"));
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async userProfileCreate(id: any, data: any) {
    console.log(id);

    try {
      const user = await User.findByIdAndUpdate(
        id,
        {
          Username: data.Username,
          DateOfBirth: data.DateOfBirth,
          Gender: data.Gender,
          Location: {
            type: "Point",
            coordinates: [data.latt1, data.long1],
          },
          DistrictOfCurrentLocation: {
            type: "Point",
            coordinates: [data.latt2, data.long2],
          },
          DistrictOfPermanentLocation: {
            type: "Point",
            coordinates: [data.latt3, data.long3],
          },
        },
        {
          new: true,
        }
      );
      return Promise.resolve(STATUS_MSG.SUCCESS.USER_CREATED);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async userImageUpload(id: any, file: any) {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        {
          ProfileUrl: `http://localhost:${process.env.PORT}/${file?.filename}`,
        },
        {
          new: true,
        }
      );
      return Promise.resolve(STATUS_MSG.SUCCESS.USER_IMAGE_UPLOADED);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const userService = new userServiceClass();
