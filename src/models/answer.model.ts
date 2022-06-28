import { Schema, model, SchemaTypes } from "mongoose";
import { IAnswer } from "../interfaces/models.interface";

const answerSchema = new Schema<IAnswer>(
  {
    jobId: {
      type: SchemaTypes.ObjectId,
      ref: "Job",
    },
    userId: {
      type: SchemaTypes.String,
      ref: "User",
    },
    userAnswer: {
      type: SchemaTypes.String,
    },
    questionId: {
      type: SchemaTypes.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Answer = model<IAnswer>("answer", answerSchema);

export default Answer;
