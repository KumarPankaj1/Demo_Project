import JobModel from "../../models/job.model";
import jobApplyModel from "../../models/jobApply.model";
import experienceModel from "../../models/workexperience.model";
import questionModel from "../../models/questions.model";
import answerModel from "../../models/answer.model";
import { STATUS_MSG } from "../../constant/app.constant";
import {
  InterfaceJob,
  IJobApply,
  IQuestion,
  IAnswer,
} from "../../interfaces/models.interface";
import { Types } from "mongoose";
import { User } from "../../utils/App.interface";
import Base from '../base.entity';

class jobEntityClass<T> extends Base<T> {
  constructor() {
    super(JobModel);
  }
  projection = {
    requirements: 0,
    personOfContact: 0,
    educationAndTiming: 0,
    feedBack: 0,
  };
  projection1 = {
    requirements: 1,
    personOfContact: 1,
    educationAndTiming: 1,
    _id: 0
  };
  async jobUpload(
    tokenData: User,
    data: any,
    file: any
  ): Promise<InterfaceJob.IJob | null> {
    try {
      let x: any = new Date(2022, 4, 6);
      let y: any = new Date();
      let z: any = y - x;
      data.jobAddedDays = (z / (1000 * 60 * 60 * 24)) | 0;
      data.companyNameUrl = `http://${process.env.HOST}:${process.env.PORT}/${file?.filename}`;
      let Data = new JobModel({
        jobName: data.jobName,
        salary: data.salary,
        opening: data.opening,
        companyName: data.companyName,
        companyNameUrl: data.companyNameUrl,
        location: {
          type: "Point",
          coordinates: [data.locationLattitude, data.locationLongitude],
        },
        requirements: data.requirements,
        jobAddedDays: data.jobAddedDays,
        educationAndTiming: {
          education: data.education,
          workingDays: data.workingDays,
          shiftTimings: data.shiftTimings,
        },
        personOfContact: {
          name: data.name,
          phoneNumber: data.phoneNumber,
          emailAddress: data.emailAddress,
          preferredTimeForContacting: data.preferredTimeForContacting,
        },
        adminId: tokenData.userId,
      });
      const job: InterfaceJob.IJob | null = await Data.save();
      return job;
    } catch (err: any) {
      console.log(err.message);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async getJobs(): Promise<InterfaceJob.IJob[]> {
    try {
      let jobs: InterfaceJob.IJob[] = await this.getModel().find(
        {},
        this.projection
      );
      console.log(jobs);
      
      if (jobs.length > 0) {
        return jobs;
      } else {
        return Promise.reject(STATUS_MSG.ERROR.INCORRECT_SYNTAX);
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async getDetails(id: string): Promise<InterfaceJob.IJob | null> {
    try {
      let jobs: InterfaceJob.IJob | null = await this.getModel().findById(id,this.projection1);
      return jobs;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async filterJob(body: InterfaceJob.IJob): Promise<InterfaceJob.IJob[]> {
    try {
      let filter = body;
      let jobs: InterfaceJob.IJob[] = await this.getModel().find(
        filter,
        this.projection
      );
      if (jobs.length > 0) {
        return jobs;
      } else {
        return Promise.reject(STATUS_MSG.ERROR.INCORRECT_SYNTAX);
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async jobApply(id: String, tokenData: User): Promise<boolean> {
    try {
      let Data = new jobApplyModel({
        userId: tokenData.userId,
        appliedJobId: id,
      });
      const details: IJobApply = await Data.save();
      if (details) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async getAppliedJOb(tokenData: any): Promise<any> {
    try {
      const appliedJobs = await jobApplyModel.aggregate([
        {
          $match: { userId: new Types.ObjectId(tokenData.userId) },
        },
        {
          $lookup: {
            from: "jobs",
            localField: "appliedJobId",
            foreignField: "_id",
            as: "AppliedJobDetails",
          },
        },
        {
          $project: {
            _id: 0,
            "AppliedJobDetails._id": 1,
            "AppliedJobDetails.jobName": 1,
            "AppliedJobDetails.salary": 1,
            "AppliedJobDetails.opening": 1,
            "AppliedJobDetails.companyName": 1,
            "AppliedJobDetails.companyNameUrl": 1,
            "AppliedJobDetails.location": 1,
          },
        },
      ]);
      return appliedJobs;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async getIntrestedJobs(tokenData: any): Promise<any> {
    try {
      const interstedJobs = await experienceModel.aggregate([
        {
          $match: { userId: new Types.ObjectId(tokenData.userId) },
        },
        {
          $lookup: {
            from: "jobs",
            localField: "workLookingFor",
            foreignField: "jobName",
            as: "IntrestedJobDetails",
          },
        },
        {
          $project: {
            _id: 0,
            "IntrestedJobDetails._id": 1,
            "IntrestedJobDetails.jobName": 1,
            "IntrestedJobDetails.salary": 1,
            "IntrestedJobDetails.opening": 1,
            "IntrestedJobDetails.companyName": 1,
            "IntrestedJobDetails.companyNameUrl": 1,
            "IntrestedJobDetails.location": 1,
          },
        },
      ]);
      return interstedJobs;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async uploadExperienceVideo(
    appliedJobId: String,
    data: IJobApply,
    file: any
  ): Promise<boolean> {
    try {
      let updateStatus: IJobApply | null = await jobApplyModel.findOneAndUpdate(
        appliedJobId,
        {
          experienceVideoUrl: `http://${process.env.HOST}:${process.env.PORT}/${file?.filename}`,
          description: data.description,
        },
        {
          new: true,
        }
      );
      if (updateStatus) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async submitJobFeedback(
    id: string,
    data: InterfaceJob.IFeedback,
    tokenData: User
  ): Promise<boolean> {
    try {
      const filter = id;
      const update = {
        $push: {
          feedBack: {
            userId: tokenData.userId,
            rating: data.rating,
            feedback: data.feedback,
          },
        },
      };
      let updateStatus: InterfaceJob.IJob | null =
        await this.getModel().findOneAndUpdate(filter, update, {
          new: true,
        });
      if (updateStatus) {
        return true;
      } else {
        return false;
      }
    } catch (err: any) {
      console.log(err.message);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async uploadQuestion(
    tokenData: User,
    data: IQuestion,
    id: string
  ): Promise<boolean> {
    try {
      let Data = new questionModel({
        jobId: id,
        question: data.question,
        answers: data.answers,
        correctAnswer: data.correctAnswer,
        createdBy: tokenData.userId,
      });
      let status: IQuestion = await Data.save();
      if (status) {
        return true;
      } else {
        return false;
      }
    } catch (err: any) {
      console.log(err.message);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async getQuestion(id: string): Promise<any> {
    try {
      const question = await this.getModel().aggregate([
        {
          $match: { _id: new Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "questions",
            localField: "_id",
            foreignField: "jobId",
            as: "Questions",
          },
        },
        {
          $project: {
            jobName: 1,
            location: 1,
            "Questions.question": 1,
            "Questions.answers": 1,
          },
        },
      ]);
      return question;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async submitAnswer(
    jobId: string,
    tokenData: User,
    data: IAnswer
  ): Promise<boolean> {
    try {
      let Data = new answerModel({
        userId: tokenData.userId,
        jobId: jobId,
        userAnswer: data.userAnswer,
        questionId: data.questionId,
      });
      const details = await Data.save();
      if (details) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async answerCount(JobId: string, tokenData: User): Promise<any> {
    try {
      let userId = tokenData.userId;
      const answerGivenByUser = await answerModel.aggregate([
        {
          $match: { jobId: new Types.ObjectId(JobId), userId: userId },
        },
        {
          $group: {
            _id: "$jobId",
            total: { $sum: 1 },
          },
        },
      ]);
      const totalQuestion = await questionModel.aggregate([
        {
          $match: { jobId: new Types.ObjectId(JobId) },
        },
        {
          $group: {
            _id: "$jobId",
            total: { $sum: 1 },
          },
        },
      ]);
      if (answerGivenByUser && totalQuestion) {
        // console.log(result1);

        return {
          answerGivenByUser: answerGivenByUser,
          totalQuestion: totalQuestion,
        };
      } else {
        return {
          answerGivenByUser: answerGivenByUser,
          totalQuestion: totalQuestion,
        };
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async jobUpdate(
    tokenData: User,
    data: any,
    file: any,
    _id: string
  ): Promise<InterfaceJob.IJob | null> {
    try {
      let x: any = new Date(2022, 4, 6);
      let y: any = new Date();
      let z: any = y - x;
      data.jobAddedDays = (z / (1000 * 60 * 60 * 24)) | 0;
      data.companyNameUrl = `http://${process.env.HOST}:${process.env.PORT}/${file?.filename}`;
      let options = {
        jobName: data.jobName,
        salary: data.salary,
        opening: data.opening,
        companyName: data.companyName,
        companyNameUrl: data.companyNameUrl,
        location: {
          type: "Point",
          coordinates: [data.locationLattitude, data.locationLongitude],
        },
        requirements: data.requirements,
        jobAddedDays: data.jobAddedDays,
        educationAndTiming: {
          education: data.education,
          workingDays: data.workingDays,
          shiftTimings: data.shiftTimings,
        },
        personOfContact: {
          name: data.name,
          phoneNumber: data.phoneNumber,
          emailAddress: data.emailAddress,
          preferredTimeForContacting: data.preferredTimeForContacting,
        },
        adminId: tokenData.userId,
      };
      // const job: InterfaceJob.IJob | null = await Data.save();
      let job = await this.getModel().findOneAndUpdate({ _id }, options, {
        new: true,
      });
      return job;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }

  async jobDelete(id: string): Promise<any> {
    try {
      const deletedata: null = await this.getModel().findByIdAndDelete(id);
      return deletedata;
    } catch (err) {
      console.log(err);
      return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
    }
  }
}

export const jobEntity = new jobEntityClass();
