import {Schema,model,SchemaTypes} from 'mongoose';
import { DBENUMS} from '../constant/app.constant';
import { IWorkExperience } from '../interfaces/models.interface';

const experienceSchema = new Schema<IWorkExperience>({
    education:{
        type:SchemaTypes.String,
        enum:DBENUMS.EDUCATION,
        required: true
    },
    isPreviousWorkExperience:{
        type:SchemaTypes.Boolean,
        required: true
    },
    typeOfPreviousWorkExperience:{
        type:SchemaTypes.String,
        enum:DBENUMS.WORKEXPERINCE
    },
    previousSalary:{
        type:[String],
    },
    preferredLocation: {
        type:SchemaTypes.String,
        enum:DBENUMS.LOCATION
    },
    jobCategory:{
        type:SchemaTypes.String,
        enum:DBENUMS.JOBCATEGORY,
    },
    expectedSalary:{
        type:SchemaTypes.String,
    },
    workLookingFor:{
        type:SchemaTypes.String,
        enum:DBENUMS.WORKLOOKINGFOR,
    },
    videoUrl:{
        type:SchemaTypes.String,
    },
    userId:{
        type:SchemaTypes.ObjectId,
        ref: 'User'
    }
    
},{
    timestamps: true
})


const workexperience = model<IWorkExperience>('Experience', experienceSchema);

export default workexperience;