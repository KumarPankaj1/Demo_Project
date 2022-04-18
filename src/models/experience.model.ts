import {Schema,model,SchemaTypes} from 'mongoose';
import { DBENUMS } from '../constant/app.constant';
import { IExperience } from '../interfaces/models.interface';

const experienceSchema = new Schema<IExperience>({
    Education:{
        type:SchemaTypes.String,
        required: true
    },
    IsPreviousExperience:{
        type:SchemaTypes.Boolean,
        required: true
    },
    PreviousExperience:{
        type:SchemaTypes.String,
    },
    PreviousSalary:{
        type:SchemaTypes.String,
        required: true
    },
    PreferredLocation:{
        type:SchemaTypes.String,//ref id
        required: true
    },
    SuitableWork:{
        type:SchemaTypes.String,
        required: true
    },
    
},{
    timestamps: true
})


const Experience = model<IExperience>('Experience', experienceSchema);

export default Experience;