import { Schema, model, SchemaTypes } from "mongoose";
import { IJobApply } from "../interfaces/models.interface";

const AppliedjobSchema = new Schema<IJobApply>(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    appliedJobId: {
        type: SchemaTypes.ObjectId,
        ref: "Job",
    },
    experienceVideoUrl:{
        type: SchemaTypes.String,
    },
    description: {
        type: SchemaTypes.String,
    }
  },
  {
    timestamps: true,
  }
);

const AppliedJob = model<IJobApply>("Appliedjob", AppliedjobSchema);

export default AppliedJob;
