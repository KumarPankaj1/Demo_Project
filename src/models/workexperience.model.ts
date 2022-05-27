import { Schema, model, SchemaTypes } from "mongoose";
import { DBENUMS } from "../constant/app.constant";
import { IWorkExperience } from "../interfaces/models.interface";

const experienceSchema = new Schema<IWorkExperience>(
  {
    education: {
      type: SchemaTypes.Number,
      enum: DBENUMS.EDUCATION,
      required: true,
    },
    isPrevWorkExp: {
      type: SchemaTypes.Boolean,
      required: true,
    },
    typeOfPreWorkExp: {
      type: [Number],
      enum: DBENUMS.WORKEXPERINCE,
    },
    previousSalary: {
      type: [Number],
    },
    preferredLocation: {
      type: SchemaTypes.Number,
      enum: DBENUMS.LOCATION,
    },
    jobCategory: {
      type: SchemaTypes.Number,
      enum: DBENUMS.JOBCATEGORY,
    },
    expectedSalary: {
      type: SchemaTypes.Number,
    },
    workLookingFor: {
      type: [String],
      enum: DBENUMS.WORKLOOKINGFOR,
    },
    videoUrl: {
      type: SchemaTypes.String,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const workexperience = model<IWorkExperience>("Experience", experienceSchema);

export default workexperience;
