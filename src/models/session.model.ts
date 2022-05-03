import { Schema, Model, model, SchemaTypes } from "mongoose";
import {interfaceSession} from "../interfaces/session.interface";
import {DBENUMS} from "../constant/app.constant"

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
    isLoggedIn: {
      type: SchemaTypes.Boolean,
      required: true,
      default: true,
    },
    userType:{
      type: SchemaTypes.String,
      required: true,
    }
  },
  {
    collection: MODEL_NAME,
    timestamps: true,
  }
);

export const SessionModel: Model<interfaceSession.ISession> = model(
  MODEL_NAME,
  sesionSchema
);
