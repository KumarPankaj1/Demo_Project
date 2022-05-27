import {Schema,model,SchemaTypes} from 'mongoose';
import { DBENUMS } from '../constant/app.constant';
import { IUser } from '../interfaces/models.interface';

// const ImageSchema = new Schema({
//     url: String,
//     filename: String,
//   });

const userSchema = new Schema<IUser>({
    username:{
        type:SchemaTypes.String,
    },
    //profile_pic
    profileUrl:{
      type:SchemaTypes.String
    },
    phoneNumber:{
        type:SchemaTypes.Number,
        required: true,
        unique: true
     },
    dateOfBirth:{
        type:SchemaTypes.Date,
    },
    emailAddress:{
      type:SchemaTypes.String
    },
    gender:{
        type:SchemaTypes.Number,
        enum:DBENUMS.GENDER,
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'],
          // default:'Point'// 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
        }
    },
    disOfCurLoc: {
        type: {
          type: String, 
          enum: ['Point'], 
          // default:'Point'
        },
        coordinates: {
          type: [Number],
        }
    },
    disOfPerLoc: {
        type: {
          type: String, 
          enum: ['Point'], 
          // default:'Point'
        },
        coordinates: {
          type: [Number],
        }
    },
    userType:{
        type:SchemaTypes.Number,
        enum:DBENUMS.USERTYPE,
    },
  },{
    timestamps: true
  })



const User = model<IUser>('User', userSchema);

export default User;