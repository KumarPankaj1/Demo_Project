import { Response } from "express";

export const sendResponse = (res: Response, response: any) => {
  res.status(response.statusCode).json(response);
};

export const SendErrorResponse = (res: Response, err: any) => {
  res.status(err.statusCode).json(err);
};
