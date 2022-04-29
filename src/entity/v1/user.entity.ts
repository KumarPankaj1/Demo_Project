import UserModel from "../../models/user.model";
import { DBENUMS, STATUS_MSG } from "../../constant/app.constant";

class userEntityClass {
  get Model() {
    return UserModel;
  }

  async userExists(payLoad: any) {
    try {
      const phoneNumber = payLoad.phoneNumber;
      const user = await this.Model.findOne({ phoneNumber });
      return user;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async userInsert(data: any) {
    try {
      let Data = new this.Model({
        phoneNumber: data.phoneNumber
      });
      let user: any = await Data.save();
      return user;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async profileCreate(data: any) {
    try {
      const user = await this.Model.findByIdAndUpdate(
        data._id,
        {
        username: data.username,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        location: {
          type: "Point",
          coordinates: [data.locationLattitude,data.locationLongitude],
        },
        districtOfCurrentLocation: {
          type: "Point",
          coordinates: [data.districtOfCurrentLocationLattitude, data.districtOfCurrentLocationLongitude],
        },
        districtOfPermanentLocation: {
          type: "Point",
          coordinates: [data.districtOfPermanentLocationLattitude, data.districtOfPermanenttLocationLongitude],
        },
        userType:data.userType,
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

  async userImageUpload(id: any, file: any) {
    try {
      console.log(id);
      
      const user = await this.Model.findByIdAndUpdate(
        id,
        {
          profileUrl: `http://localhost:${process.env.PORT}/${file?.filename}`,
        },
        {
          new: true,
        }
      );
      console.log(user);
      
      return user;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const userEntity = new userEntityClass();

// static async userExists(payLoad: any): Promise<boolean>{
//   try{
//       if(payLoad._id){
//           payLoad._id = new Types.ObjectId(payLoad._id);
//       }
//       const userExists = await this.getModel().findOne(payLoad);
//       if(userExists){
//           return true;
//       }else{
//           return false
//       }
//   }catch(err){
//       logger.error(err);
//       return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
//   }
// }

// async userSignup(data: any) {
//   try {
//     const userExist = await User.findOne({
//       phoneNumber: data.PhoneNumber,
//     });
//     if (userExist) {
//       return Promise.reject(STATUS_MSG.ERROR.ALREADY_EXIST("Already"));
//     }
//     let Data = new User({
//       phoneNumber: data.PhoneNumber,
//       userType: data.UserType,
//     });
//     let user: any = await Data.save();
//     let token = jwt.sign({ _id: user._id }, <string>process.env.SECRET_KEY);
//     const statusData = STATUS_MSG.SUCCESS.CREATED({ token: token });
//     return Promise.resolve(statusData);
//   } catch (err) {
//     return Promise.reject(STATUS_MSG.ERROR.INCORECT_INFORMATION);
//   }
// // }

// async userLogin(data: any, token: any) {
//   try {
//     const user = await User.findOne({ PhoneNumber: data.PhoneNumber });
//     if (user) {
//       if (token === undefined) {
//         let newtoken = jwt.sign(
//           { _id: user._id },
//           <string>process.env.SECRET_KEY
//         );
//         return Promise.resolve(STATUS_MSG.SUCCESS.USER_LOGGED_IN_SUCCESFULLY({newtoken:newtoken}));
//       } else {
//         return Promise.reject(STATUS_MSG.ERROR.ALREADY_LOGGEDIN("user"));
//       }
//     } else {
//       return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST("user"));
//     }
//   } catch (err) {
//     return Promise.reject(err);
//   }
// }
// }

// {
//   username: 'Pankaj',
//   dateOfBirth: '01/02/2000',
//   emailAddress: 'kumarpankaj22881@gmail.com',
//   gender: '1',
//   location: { coordinates: [ 12.27, 12.37 ] },
//   districtOfCurrentLocation: { coordinates: [ 13.27, 13.37 ] },
//   districtOfPermanentLocation: { coordinates: [ 14.27, 14.37 ] },
//   _id: '626234d13bcd360e33d24ac4'
// }

// async userProfileCreate(id: any, data: any) {
//   console.log(id);

//   try {
//     const user = await User.findByIdAndUpdate(
//       id,
//       {
//         username: data.Username,
//         dateOfBirth: data.DateOfBirth,
//         gender: data.Gender,
//         location: {
//           type: "Point",
//           coordinates: [data.latt1, data.long1],
//         },
//         districtOfCurrentLocation: {
//           type: "Point",
//           coordinates: [data.latt2, data.long2],
//         },
//         districtOfPermanentLocation: {
//           type: "Point",
//           coordinates: [data.latt3, data.long3],
//         },
//       },
//       {
//         new: true,
//       }
//     );
//     return Promise.resolve(STATUS_MSG.SUCCESS.USER_CREATED);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// }

// async userImageUpload(id: any, file: any) {
//   try {
//     const user = await User.findByIdAndUpdate(
//       id,
//       {
//         profileUrl: `http://localhost:${process.env.PORT}/${file?.filename}`,
//       },
//       {
//         new: true,
//       }
//     );
//     return Promise.resolve(STATUS_MSG.SUCCESS.USER_IMAGE_UPLOADED);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// }
// }

// username : data.username,
          // dateOfBirth: data.dateOfBirth,
          // gender : data.gender,
          // emailAddress: data.emailAddress,
          // location: data.location,
          // districtOfCurrentLocation: data.districtOfCurrentLocation,
          // districtOfPermanentLocation: data.districtOfPermanentLocation,
