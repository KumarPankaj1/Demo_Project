import {Schema,model,SchemaTypes} from 'mongoose';
import { DBENUMS } from '../constant/app.constant';
import { IAdmin } from '../interfaces/models.interface';

// const ImageSchema = new Schema({
//     url: String,
//     filename: String,
//   });

const adminSchema = new Schema<IAdmin>({
    Adminname:{
        type:SchemaTypes.String,
        required: true
    },
    ProfileUrl:String,
    Phone_Number:{
        type:SchemaTypes.Number,
        required: true,
        unique: true
    },
    DateOfBirth:{
        type:SchemaTypes.Date,
        required: true
    },
    Gender:{
        type:SchemaTypes.String,
        enum:DBENUMS.GENDER,
        required: true
    },
    Location: {
        type: {
          type: String, 
          enum: ['Point'], 
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    CurrentLocation: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    PermanentLocation: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    AdminType:{
        type:SchemaTypes.Number,
        enum:DBENUMS.ADMIN,
        Defalut: 'SUPER_ADMIN'
    },
  
},{
  timestamps: true
})


const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;