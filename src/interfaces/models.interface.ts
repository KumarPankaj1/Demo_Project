import { Document, Schema } from "mongoose";

export interface IUser {
    _id: Schema.Types.ObjectId;
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
  _id: Schema.Types.ObjectId
  adminName: string,
  profileUrl: string,
  phoneNumber: number,
  dateOfBirth: Date,
  emailAddress: string,
  gender: string,
  adminType: number,
  location: Object,
  districtOfCurrentLocation: Object,
  districtOfPermanentLocation: Object
}

export interface IWorkExperience {
    education: number,
    isPreviousWorkExperience: boolean,
    typeOfPreviousWorkExperience: number,
    previousSalary: number[],
    preferredLocation: number,
    jobCategory: number
    expectedSalary: number
    workLookingFor: number
    videoUrl: string,
    userId: Schema.Types.ObjectId
}

export interface IJob {
    jobName: string,
    salary: number,
    opening:number
    companyName: string
    companyNameUrl: string
    location: Object,
    jobAddedDays: number
    requirements: string,
    educationAndTiming: object,
    personOfContact: object
}

export interface IResult {
    totalScore: Number,
    userScore: Number,
    userPercentage: Number,
    rating: Number,
    createdAt: Date,
    updatedAt: Date
}


