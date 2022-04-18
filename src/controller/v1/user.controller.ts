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
        return Promise.resolve(response);
      }
    } catch (err) {
      Promise.reject(err);
    }
  }

  async verifyOtp(data: any) {
    try {
      if (data.PhoneNumber && data.code.length === 6) {
        const response = await client.verify
          .services(process.env.SERVICE_ID)
          .verificationChecks.create({
            to: `+${data.PhoneNumber}`,
            code: data.code,
          });
        console.log(response.status);

        return Promise.resolve(response);
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async userSignup(data: any) {
    try {
      const userExist = await User.findOne({
        PhoneNumber: data.PhoneNumber,
      });
      if (userExist) {
        return Promise.reject("alraedy exist");
        //throw new Error(STATUS_MSG.ERROR.TOKEN_ALREADY_EXIST.message);
      }
      let Data = new User({
        PhoneNumber: data.PhoneNumber,
        UserType: data.UserType,
      });
      let user: any = await Data.save();
      let token = jwt.sign({ _id: user._id }, <string>process.env.SECRET_KEY);
      return Promise.resolve({ user, token });
    } catch (err) {
      return Promise.reject(err);
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
          return Promise.resolve({ user, newtoken });
        } else {
          return Promise.reject("user already logged in");
        }
      } else {
        return Promise.reject("user does't exist");
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
      console.log(user);
      
      return Promise.resolve(user);
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
      return Promise.resolve(user);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const userService = new userServiceClass();
