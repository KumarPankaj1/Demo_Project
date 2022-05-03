import { validator } from "../utils/validator";
import { Request, Response, NextFunction } from "express";

class validatorClass {
  signupValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validator.Signup.validateAsync(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
  loginValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validator.LogIn.validateAsync(req.body);
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
      await validator.ProfileCreate.validateAsync(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}

export const validators = new validatorClass();
