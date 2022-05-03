import { Document, Schema } from "mongoose";

export interface IUser {
    _id: Schema.Types.ObjectId
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
    education: string,
    isPreviousWorkExperience: boolean,
    typeOfPreviousWorkExperience: string,
    previousSalary: string[],
    preferredLocation: Object,
    jobCategory: string
    expectedSalary: string
    workLookingFor: string
    videoUrl: string,
    userId: Schema.Types.ObjectId
}

export interface IJob {
    jobname: string,
    salary: number,
    opening:number
    companyName: string
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


