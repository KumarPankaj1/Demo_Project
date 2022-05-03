import { Schema, model, SchemaTypes } from "mongoose";
import { DBENUMS } from "../constant/app.constant";
import { IJob } from "../interfaces/models.interface";

const jobSchema = new Schema<IJob>(
  {
    jobname: {
      type: SchemaTypes.String,
      trim: true,
      required: true,
    },
    salary: {
      type: SchemaTypes.Number,
    },
    opening: {
      type: SchemaTypes.Number,
    },
    companyName: {
      type: SchemaTypes.String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    requirements: {
      type: SchemaTypes.String,
      trim: true,
      required: true,
    },
    jobAddedDays: {
      type: SchemaTypes.Number,
    },
    educationAndTiming: {
      education: {
        type: SchemaTypes.String,
      },
      workingDays: {
        type: SchemaTypes.String,
      },
      shiftTimings: {
        type: SchemaTypes.String,
      },
    },
    personOfContact: {
      name: {
        type: SchemaTypes.String,
      },
      phoneNumber: {
        type: SchemaTypes.String,
      },
      emailAddress: {
        type: SchemaTypes.String,
      },
      preferredTimeForContacting: {
        type: SchemaTypes.String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Job = model<IJob>("job", jobSchema);

export default Job;
