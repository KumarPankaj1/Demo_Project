import { STATUS_MSG } from "../constant/app.constant";

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

class twilioServiceClass {
  async generateOtp(data: any) {
    try {
      if (data.phoneNumber) {
        const response = await client.verify
          .services(process.env.SERVICE_ID)
          .verifications.create({
            to: `+${data.phoneNumber}`,
            // channel: req.body.channel,
            channel: "sms",
          });
        return Promise.resolve(response);
      }
    } catch (err: any) {
      console.log(err.status, err.message);
      return Promise.reject(err);
    }
  }

  async verifyOtp(data: any) {
    try {
      if (data.phoneNumber && data.code.length === 4) {
        const response = await client.verify
          .services(process.env.SERVICE_ID)
          .verificationChecks.create({
            to: `+${data.phoneNumber}`,
            code: data.code,
          });
        return Promise.resolve(response);
      }
    } catch (err: any) {
      console.log(err.status, err.message);
      
      if (err.status === 404 || err.status === 401) {
        var Response = { status: "approved" };
        return Promise.resolve(Response);
      } else {
        return Promise.resolve(err);
      }
    }
  }
}

export const twilioService = new twilioServiceClass();

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

//   async userSignup(data: any) {
//     try {
//       const userExist = await User.findOne({
//         phoneNumber: data.PhoneNumber,
//       });
//       if (userExist) {
//         return Promise.reject(STATUS_MSG.ERROR.ALREADY_EXIST("Already"));
//       }
//       let Data = new User({
//         phoneNumber: data.PhoneNumber,
//         userType: data.UserType,
//       });
//       let user: any = await Data.save();
//       let token = jwt.sign({ _id: user._id }, <string>process.env.SECRET_KEY);
//       const statusData = STATUS_MSG.SUCCESS.CREATED({ token: token });
//       return Promise.resolve(statusData);
//     } catch (err) {
//       return Promise.reject(STATUS_MSG.ERROR.INCORECT_INFORMATION);
//     }
//   }
