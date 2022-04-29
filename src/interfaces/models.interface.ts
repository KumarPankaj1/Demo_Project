import { Document, Types } from "mongoose";

export interface IUser {
    username: string,
    profileUrl:string,
    phoneNumber: number,
    dateOfBirth: Date,
    emailAddress: string,
    gender: string,
    userType: number,
    location: Object,
    districtOfCurrentLocation: Object,
    districtOfPermanentLocation: Object
}

export interface IAdmin {
    Adminname: String,
    ProfileUrl:String,
    Phone_Number: Number,
    DateOfBirth: Date,
    Gender: String,
    AdminType: Number,
    Location: Object,
    CurrentLocation: Object,
    PermanentLocation: Object,
}

export interface IExperience {
    Education: String,
    IsPreviousExperience: Boolean,
    PreviousExperience: String,
    PreviousSalary: String,
    PreferredLocation: String,
    SuitableWork: String
    video: String,
    createdAt: Date,
    updatedAt: Date
}

export interface IJob {
    job_name: String,
    salary: String,
    opening:Number
    company_name: String
    Location: Object,
    requirements: String,
    education: String,
    workingdays: String,
    createdAt: Date,
    updatedAt: Date
}

export interface IResult {
    totalScore: Number,
    userScore: Number,
    userPercentage: Number,
    rating: Number,
    createdAt: Date,
    updatedAt: Date
}



export namespace ISession {
  export interface CreateData {
    deviceId: string;
    deviceToken?: string;
  }
  export interface Doc extends Document, CreateData {
    userId: Types.ObjectId;
    isActive: boolean;
  }
  export enum LogoutTarget {
    Single = "single",
    Device = "device",
    All = "all",
  }
}