import { adminValidator } from "../utils/admin.validator";
import { Request, Response, NextFunction } from "express";

class adminValidatorClass {
  signupValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await adminValidator.Signup.validateAsync(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
  loginValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await adminValidator.LogIn.validateAsync(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
  ProfileCreateValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await adminValidator.ProfileCreate.validateAsync(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}

export const adminValidators = new adminValidatorClass();
