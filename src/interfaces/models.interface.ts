export interface IUser {
    Username: String,
    ProfileUrl:String,
    PhoneNumber: Number,
    DateOfBirth: Date,
    Gender: String,
    UserType: Number,
    Location: Object,
    DistrictOfCurrentLocation: Object,
    DistrictOfPermanentLocation: Object
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