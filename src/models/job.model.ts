import { Schema, model, SchemaTypes } from "mongoose";
import { InterfaceJob } from "../interfaces/models.interface";

const jobSchema = new Schema<InterfaceJob.IJob>(
  {
    jobName: {
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
    companyNameUrl:{
      type: SchemaTypes.String,
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
    feedBack:[
      {
        userId: { type :SchemaTypes.ObjectId, ref: "User" ,
        unique: true},
        rating: Number,
        feedback: String,
      }],
    adminId:{
      type:SchemaTypes.ObjectId,
      ref: 'Admin'
    }
  },
  {
    timestamps: true,
  }
);


jobSchema.pre(/^find/, function(next) {
  // this keyword refers to the current query
  // select method excludes or includes fields using + and -
  this.select("-__v");
  this.select("-createdAt");
  this.select("-updatedAt");
  this.select("-adminId");
  next();
});


const Job = model<InterfaceJob.IJob>("job", jobSchema);

export default Job;
