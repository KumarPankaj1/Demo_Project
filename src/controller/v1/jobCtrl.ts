import { Request, Response } from "express";
import { DBENUMS, STATUS_MSG } from "../../constant/app.constant";
import { sendErrorResponse } from "./../../utils/errorhandler";
import {Schema} from 'mongoose'
import { sendResponse, SendErrorResponse } from "./../../utils/response";
import {
  InterfaceJob,
  IQuestion,
  IJobApply,
} from "../../interfaces/models.interface";
import { jobEntity } from "../../entity/v1/job.entity";


import {RequestHandler} from "express";

type params = {};
type resbody = {};
type reqbody = {};
type ReqQuery = {
    id: string;
}

class jobClass {
  async jobUpload(req: Request, res: Response): Promise<void> {
    try {
      // console.log(DBENUMS.WORKLOOKINGFOR)
      let job: InterfaceJob.IJob | null = await jobEntity.jobUpload(
        req.user,
        req.body,
        req.file
      );
      if (job) {
        sendResponse(res, STATUS_MSG.SUCCESS.JOB_CREATED({}));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async getJobs(req: Request, res: Response): Promise<void> {
    try {
      let jobs = await jobEntity.getJobs();
      if (jobs) {
        sendResponse(res, STATUS_MSG.SUCCESS.FETCH_SUCCESS(jobs));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async filterJob(req: Request, res: Response) {
    try {
      let jobs = await jobEntity.filterJob(req.body);
      if (jobs) {
        sendResponse(res, STATUS_MSG.SUCCESS.FILTER_SUCCESS(jobs));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async getDetails(req: Request, res: Response): Promise<void> {
    try {
      let jobs = await jobEntity.getDetails(req.params.jobid);
      if (jobs) {
        sendResponse(res, STATUS_MSG.SUCCESS.FETCH_SUCCESS(jobs));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async jobApply(req: Request, res: Response): Promise<void> {
    try {
      let status = await jobEntity.jobApply(req.params.jobid, req.user);
      if (status) {
        sendResponse(res, STATUS_MSG.SUCCESS.APPLIED_SUCCESS({}));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async getAppliedJOb(req: Request, res: Response): Promise<void> {
    try {
      let appliedJobs = await jobEntity.getAppliedJOb(req.user);
      if (appliedJobs) {
        sendResponse(res, STATUS_MSG.SUCCESS.FETCH_SUCCESS(appliedJobs));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async getIntrestedJobs(req: Request, res: Response): Promise<void> {
    try {
      let intrestedJobs = await jobEntity.getIntrestedJobs(req.user);
      if (intrestedJobs) {
        sendResponse(res, STATUS_MSG.SUCCESS.FETCH_SUCCESS(intrestedJobs));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async uploadExperienceVideo(req: Request, res: Response): Promise<void> {
    try {
      let status = await jobEntity.uploadExperienceVideo(
        req.params.jobid,
        req.body,
        req.file
      );
      if (status) {
        sendResponse(res, STATUS_MSG.SUCCESS.FETCH_SUCCESS("success"));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err: any) {
      SendErrorResponse(res, err);
    }
  }

  async submitJobFeedback(req: Request, res: Response): Promise<void> {
    try {
      let status = await jobEntity.submitJobFeedback(
        req.query.jobid as string,
        req.body,
        req.user
      );
      if (status) {
        sendResponse(res, STATUS_MSG.SUCCESS.FEEDBACK_SUCCESS({}));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async UploadQuestion(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.params.jobid);
      
      let status: boolean = await jobEntity.uploadQuestion(
        req.user,
        req.body,
        req.params.jobid as string,
      );
      if (status) {
        sendResponse(res, STATUS_MSG.SUCCESS.QUESTION_UPLOADED({}));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async getQuestion(req: Request, res: Response): Promise<void> {
    try {
      let questions = await jobEntity.getQuestion(req.params.jobid as string);
      if (questions) {
        sendResponse(res, STATUS_MSG.SUCCESS.FETCH_SUCCESS(questions));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

  async submitAnswer(req: Request, res: Response): Promise<void> {
    try {
      let status = await jobEntity.submitAnswer(req.params.jobid as string,req.user,req.body);
      if (status) {
        sendResponse(res, STATUS_MSG.SUCCESS.SUBMIT_SUCCESS({}));
      } else {
        SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
      }
    } catch (err) {
      SendErrorResponse(res, err);
    }
  }

async answerCount(req: Request, res: Response): Promise<void>{
  try {
    let count = await jobEntity.answerCount(req.params.jobid as string ,req.user);
    if (count) {
      sendResponse(res, STATUS_MSG.SUCCESS.COUNT_SUCCESS(count));
    } else {
      SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
    }
  } catch (err) {
    SendErrorResponse(res, err);
  }
}


async jobUpdate(req: Request, res: Response): Promise<void> {
  try {
    let job: InterfaceJob.IJob | null = await jobEntity.jobUpdate(
      req.user,
      req.body,
      req.file,
      req.params.jobid as string
    );
    if (job) {
      sendResponse(res, STATUS_MSG.SUCCESS.UPDATE_SUCCESS({}));
    } else {
      SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
    }
  } catch (err) {
    SendErrorResponse(res, err);
  }
}

async deleteJob(req: Request, res: Response): Promise<void> {
  try {
    let status: InterfaceJob.IJob | null = await jobEntity.jobDelete(
      req.params.jobid as string
    );
    if (status) {
      sendResponse(res, STATUS_MSG.SUCCESS.DELETE_SUCCESS({}));
    } else {
      SendErrorResponse(res, STATUS_MSG.ERROR.INCORECT_INFORMATION);
    }
  } catch (err) {
    SendErrorResponse(res, err);
  }
}


}

export const Job = new jobClass();
