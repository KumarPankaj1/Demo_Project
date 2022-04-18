import {Schema,model,SchemaTypes} from 'mongoose';
import { DBENUMS } from '../constant/app.constant';
import { IResult} from '../interfaces/models.interface';

const resultSchema = new Schema<IResult>({
    totalScore:{
      type: 'number',
      enum:['15']
    },
    userScore:{
       type: 'number',
       required:true
    },
    userPercentage:{
       type: 'number',
       required:true
    },
    rating:{
        type: 'number',
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


const Result = model<IResult>('result', resultSchema);

export default Result;