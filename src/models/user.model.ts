import {Schema,model,SchemaTypes} from 'mongoose';
import { DBENUMS } from '../constant/app.constant';
import { IUser } from '../interfaces/models.interface';

// const ImageSchema = new Schema({
//     url: String,
//     filename: String,
//   });

const userSchema = new Schema<IUser>({
    Username:{
        type:SchemaTypes.String,
    },
    //profile_pic
    ProfileUrl:{
      type:SchemaTypes.String
    },
    PhoneNumber:{
        type:SchemaTypes.Number,
        required: true,
        unique: true
     },
    DateOfBirth:{
        type:SchemaTypes.Date,
    },
    //enum number
    Gender:{
        type:SchemaTypes.String,
        enum:DBENUMS.GENDER,
    },
    Location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
        }
    },
    DistrictOfCurrentLocation: {
        type: {
          type: String, 
          enum: ['Point'], 
        },
        coordinates: {
          type: [Number],
        }
    },
    DistrictOfPermanentLocation: {
        type: {
          type: String, 
          enum: ['Point'], 
        },
        coordinates: {
          type: [Number],
        }
    },
    UserType:{
        type:SchemaTypes.Number,
        enum:DBENUMS.ROLE,
        required: true
    },
  },{
    timestamps: true
  })



const User = model<IUser>('User', userSchema);

export default User;