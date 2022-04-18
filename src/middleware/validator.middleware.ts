// import { validator } from "../utils/validator";
// import { Request, Response, NextFunction } from "express";

// class validatorClass {
//   signupValidator = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await validator.userSignup.validateAsync(req.body);
//       next();
//     } catch (err: any) {
//       res.status(400).json({ error: err.message });
//     }
//   };
//   loginValidator = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await validator.userLogIn.validateAsync(req.body);
//       next();
//     } catch (err: any) {
//       res.status(400).json({ error: err.message });
//     }
//   };
//   userProfileCreateValidator = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       await validator.userProfileCreate.validateAsync(req.body);
//       next();
//     } catch (err: any) {
//       res.status(400).json({ error: err.message });
//     }
//   };
// }

// export const validators = new validatorClass();
