import { Mongoose,Document, Schema,Types } from "mongoose";

export interface IUser {
    _id: Schema.Types.ObjectId,
    username: string,
    profileUrl:string,
    phoneNumber: number,
    dateOfBirth: Date,
    emailAddress: string,
    gender: number,
    userType: number,
    location: Object,
    disOfCurLoc: Object,
    disOfPerLoc: Object
}


export interface IAdmin {
  _id: Schema.Types.ObjectId,
  adminName: string,
  profileUrl: string,
  phoneNumber: number,
  dateOfBirth: Date,
  emailAddress: string,
  gender: number,
  adminType: number,
  location: Object,
  disOfCurLoc: Object,
  disOfPerLoc: Object
}

export interface IWorkExperience {
    education: number,
    isPrevWorkExp: boolean,
    typeOfPreWorkExp: number[],
    previousSalary: number[],
    preferredLocation: number,
    jobCategory: number,
    expectedSalary: number,
    workLookingFor: string[],
    videoUrl: string,
    userId: Schema.Types.ObjectId
}



export namespace InterfaceJob {
    export interface IFeedback{
            userId: Schema.Types.ObjectId,
            rating: number,
            feedback: String
    }
    export interface IJob{
    _id: Schema.Types.ObjectId,
    jobName: string,
    salary: number,
    opening:number,
    companyName: string,
    companyNameUrl: string,
    location: Object,
    jobAddedDays: number,
    requirements: string,
    educationAndTiming: object,
    personOfContact: object,
    adminId:Schema.Types.ObjectId,
    select(data:string): void,
    feedBack:IFeedback[]
}
}


export interface IJobApply{
    userId: Schema.Types.ObjectId,
    appliedJobId:Schema.Types.ObjectId,
    experienceVideoUrl: string,
    description: string
}

export interface IQuestion{
    jobId: Schema.Types.ObjectId,
    question: string,
    answers: string[],
    correctAnswer: string
    createdBy:Schema.Types.ObjectId,
}

export interface IAnswer{
    userId: Schema.Types.ObjectId,
    jobId: Schema.Types.ObjectId,
    questionId:Schema.Types.ObjectId,
    userAnswer: string,
}






