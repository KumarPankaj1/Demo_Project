import { Schema, model, SchemaTypes } from "mongoose";
import { IQuestion } from "../interfaces/models.interface";

const questionSchema = new Schema<IQuestion>(
  {
    jobId: {
      type: SchemaTypes.ObjectId,
      ref: "Job",
    },
    question: {
      type: SchemaTypes.String,
      unique: true
    },
    answers: {
      type: [String],
      unique: true
    },
    correctAnswer: {
      type: SchemaTypes.String
    },
    createdBy:{
        type:Schema.Types.ObjectId,
    }
  },
  {
    timestamps: true,
  }
);

const Question = model<IQuestion>("question", questionSchema);

export default Question;
