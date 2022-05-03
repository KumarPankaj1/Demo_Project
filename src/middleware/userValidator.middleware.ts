import { userValidator } from "../utils/user.validator";
import { Request, Response, NextFunction } from "express";

class userValidatorClass {
  signupValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userValidator.Signup.validateAsync(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
  loginValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userValidator.LogIn.validateAsync(req.body);
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
      await userValidator.ProfileCreate.validateAsync(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}

export const userValidators = new userValidatorClass();
