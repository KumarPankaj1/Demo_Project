import { Schema, Model, model, SchemaTypes } from "mongoose";
import { ISession } from "../interfaces/models.interface";

export const MODEL_NAME = "sessions";

const sesionSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    deviceId: {
      type: SchemaTypes.String,
      required: true,
    },
    deviceToken: {
      type: SchemaTypes.String,
      required: false,
    },
    isActive: {
      type: SchemaTypes.Boolean,
      required: true,
      default: true,
    },
    createdAt: {
      type: SchemaTypes.Date,
      default: () => new Date(),
    },
    updatedAt: {
      type: SchemaTypes.Date,
      default: () => new Date(),
    },
  },
  {
    collection: MODEL_NAME,
    timestamps: true,
  }
);

export const SessionModel: Model<ISession.Doc> = model(
  MODEL_NAME,
  sesionSchema
);
