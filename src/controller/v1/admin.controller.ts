import express, { Application, Request, Response } from "express";
import Admin from "../../models/admin.model";
require('dotenv').config();
import jwt from 'jsonwebtoken';
import { STATUS_MSG } from "../../constant/app.constant";
const app: Application = express();
app.use(express.json());

const client = require("twilio")(
    process.env.ACCOUNT_SID,
    process.env.AUTH_TOKEN
  );

class adminServiceClass{
   async adminGenerateOtp(data:any){
    try {
      // console.log(req.body);
      if (data.PhoneNumber) {
        const response= await client.verify
          .services(process.env.SERVICE_ID)
          .verifications.create({
            to: `+${data.PhoneNumber}`,
            // channel: req.body.channel,
            channel: "sms"
          })
          return Promise.resolve(response)
           
      } else {
        return Promise.reject("INVALID CREDENTIALS")
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  async adminlogin(data:any , file:any){ 
    try {
      if (data.PhoneNumber && data.code.length === 6) {
        const response = await client.verify
          .services(process.env.SERVICE_ID)
          .verificationChecks.create({
            to: `+${data.PhoneNumber}`,
            code: data.code,
          });

        if (response.status === "approved") {
          // console.log("pankaj");

          try {
            // console.log(req.file);
            const adminExist = await Admin.findOne({
              PhoneNumber: data.PhoneNumber,
            });
            if (adminExist) {
              return Promise.resolve(adminExist);
            } else {
              const doc = new Admin({
                Adminname: data.Adminname,
                ProfileUrl: `http://localhost:${process.env.PORT}/${file?.filename}`,
                PhoneNumber: data.PhoneNumber,
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
                AdminType: data.AdminType,
              });

              const user = await doc.save();
              let token = jwt.sign({ _id: user._id }, "Pankaj Parmar");
              return Promise.resolve({
                user,
                token,
              });
            }
          } catch (err) {
            return Promise.reject({ a: err });
          }// dotenv.config({ path: "../../.env" });
        } else {
          return Promise.reject("invalid credentials");
        }
      }
    } catch (err: any) {
      return Promise.reject({ b: err });
    }
  }
  }
                            

              

export const adminService = new adminServiceClass();

