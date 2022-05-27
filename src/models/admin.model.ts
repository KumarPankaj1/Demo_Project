import {Schema,model,SchemaTypes} from 'mongoose';
import { DBENUMS } from '../constant/app.constant';
import { IAdmin } from '../interfaces/models.interface';


const adminSchema = new Schema<IAdmin>({
    adminName:{
        type:SchemaTypes.String,
    },
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
          type: String, 
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
        }
    },
    disOfCurLoc: {
        type: {
          type: String, 
          enum: ['Point'], 
        },
        coordinates: {
          type: [Number],
        }
    },
    disOfPerLoc: {
        type: {
          type: String, 
          enum: ['Point'], 
        },
        coordinates: {
          type: [Number],
        }
    },
    adminType:{
        type:SchemaTypes.Number,
        enum:DBENUMS.ADMIN,
    },
  },{
    timestamps: true
  })



const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;