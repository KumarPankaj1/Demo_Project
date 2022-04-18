import {Schema,model,SchemaTypes} from 'mongoose';
import { DBENUMS } from '../constant/app.constant';
import { IJob } from '../interfaces/models.interface';

const jobSchema = new Schema<IJob>({
    job_name:{
        type:SchemaTypes.String,
        trim:true,
        required: true
    },
    salary:{
        type:SchemaTypes.String,
        required: true
    },
    opening:{
        type:SchemaTypes.Number,
            required: true
    },
    company_name:{
       type:SchemaTypes.String,
       required: true
    },
    Location: {
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
    requirements: {
        type: SchemaTypes.String,
        trim:true,
        required: true
    },
    education: {
        type: SchemaTypes.String,
        required: true
    },
    workingdays:{
        type: SchemaTypes.String,
        required: true
    },
    createdAt:{
        type:SchemaTypes.Date,
        required: true
    },
    updatedAt:{
        type:SchemaTypes.Date,
        required: true
    }
})


const Job = model<IJob>('job', jobSchema);

export default Job;