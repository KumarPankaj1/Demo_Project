import {Schema,model,SchemaTypes} from 'mongoose';
import { DBENUMS} from '../constant/app.constant';
import { IWorkExperience } from '../interfaces/models.interface';

const experienceSchema = new Schema<IWorkExperience>({
    education:{
        type:SchemaTypes.Number,
        enum:DBENUMS.EDUCATION,
        required: true
    },
    isPreviousWorkExperience:{
        type:SchemaTypes.Boolean,
        required: true
    },
    typeOfPreviousWorkExperience:{
        type:SchemaTypes.Number,
        enum:DBENUMS.WORKEXPERINCE
    },
    previousSalary:{
        type:[Number],
    },
    preferredLocation: {
        type:SchemaTypes.Number,
        enum:DBENUMS.LOCATION
    },
    jobCategory:{
        type:SchemaTypes.Number,
        enum:DBENUMS.JOBCATEGORY,
    },
    expectedSalary:{
        type:SchemaTypes.Number,
    },
    workLookingFor:{
        type:SchemaTypes.Number,
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