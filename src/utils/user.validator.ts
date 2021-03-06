import Joi from "joi";
// Joi.objectId = require('joi-objectid')(Joi)

class userValidatorClass {

  Signup = Joi.object({
    phoneNumber: Joi.number().min(12).required(),
  });

  LogIn = Joi.object({
    phoneNumber: Joi.number().min(12).required(),
    code:Joi.string().length(4).required(),
  });

  ProfileCreate = Joi.object({
    username: Joi.string().trim().min(3).max(15).lowercase().required(),
    dateOfBirth: Joi.date(),
    emailAddress: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    gender:Joi.number().valid(1,2,3),
    locLat:Joi.number(),
    locLong:Joi.number(),
    disOfCurLocLat:Joi.number(),
    disOfCurLocLong:Joi.number(),
    disOfPerLocLat:Joi.number(),
    disOfPerLocLong:Joi.number(),
    userType:Joi.number().valid(1,2,3)
});


WorkExperienceDetails = Joi.object({
  education: Joi.number().valid(1,2,3,4).required(),
  isPreWorkExp: Joi.boolean().valid(true,false).required(),
  typeOfPreWorkExp:Joi.array(),
  previousSalary:Joi.array(),
  preferredLocation:Joi.number().valid(1,2,3),
  jobCategory:Joi.number().valid(1,2,3),
  expectedSalary:Joi.number(),
  workLookingFor:Joi.array(),
})
}

export const userValidator = new userValidatorClass();
















// import { Request, Response, NextFunction } from "express";
// import { check, validationResult } from "express-validator";

// const LoginValidator = [
//   check("phoneNumber")
//   .not()
//   .isEmpty()
//   .withMessage("User name can not be empty!")
//   .isLength({ min: 10 })
//   .withMessage("Please enter a valid phone number")
//   .isLength({ max: 13 })
//   .withMessage("Please enter a valid phone number"),  
//   (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//       return res.status(402).json({ errors: errors.array() });
//     next();
//   },
// ];

// const ProfileCreateValidator = [
//     check("username")
//     .not()
//     .trim()
//     .isEmpty()
//     .withMessage("User name can not be empty!")
//     .isAlphanumeric()
//     .withMessage("invalid username")
//     .isLength({max:16})
//     .withMessage("invalid username,maximum 16 characters allowed")
//     .isLength({ min: 3 })
//     .withMessage("Minimum 3 characters required!"),
//     (req: Request, res: Response, next: NextFunction) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty())
//         return res.status(402).json({ errors: errors.array() });
//       next();
//     },
// ]

//  export {LoginValidator ,ProfileCreateValidator};

 

// //   userSignup = Joi.object({
// //     username: Joi.string().trim().min(3).max(15).lowercase().required(),
// //     password: Joi.string().min(5).required(),
// //     email: Joi.string().trim().email().required(),
// //     status: Joi.string().trim().uppercase()
// // });

// // export const userLogIn = ()=> {
// //     Joi.object({
// //     username: Joi.string().trim().min(3).lowercase().required(),
// //     // password: Joi.string().min(5).max(20).required(),
// //     // tokenId: Joi.string().trim()
// // })}

// // export const username = Joi.object({
// //     username: Joi.string().trim().min(3).lowercase().required()
// // })

// // export const userUpdate = Joi.object({
// //     password: Joi.string().min(5).max(20),
// //     email: Joi.string().trim().email().required(),
// //     tokenId: Joi.string().trim()
// // })

//   // check("Username")
//   //   .not()
//   //   .trim()
//   //   .isEmpty()
//   //   .withMessage("User name can not be empty!")
//   //   .isAlphanumeric()
//   //   .withMessage("invalid username")
//   //   .isLength({max:16})
//   //   .withMessage("invalid username,maximum 16 characters allowed")
//   //   .isLength({ min: 3 })
//   //   .withMessage("Minimum 3 characters required!"),
// //   check("password")
// //     .not()
// //     .isEmpty()
// //     .withMessage("Password cannot be empty")
// //     .isLength({ min: 4 })
// //     .withMessage("Password must be more than 4 charecters")
// //     .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
// //     .withMessage("password must contain a special charcter, a upper and lower case letter with Number")
// //     .isLength({ max: 10 })
// //     .withMessage("Password must be less than 10 charecters"),
// //   check("firstName")
// //     .not()
// //     .isEmpty()
// //     .withMessage("User name can not be empty!")
// //     .isLength({ min: 3 })
// //     .withMessage("Minimum 3 characters required!"),
// //   check("lastName")
// //     .not()
// //     .isEmpty()
// //     .withMessage("User name can not be empty!")
// //     .isLength({ min: 3 })
// //     .withMessage("Minimum 3 characters required!"),
// //   check("email")
// //     .not()
// //     .isEmpty()
// //     .withMessage("Invalid email address!")
// //     .isEmail()
// //     .withMessage("Please enter a valid email address"),
