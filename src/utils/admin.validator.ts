import Joi from "joi";
// Joi.objectId = require('joi-objectid')(Joi)

class adminValidatorClass {

  Signup = Joi.object({
    phoneNumber: Joi.number().min(12).required(),
  });

  LogIn = Joi.object({
    phoneNumber: Joi.number().min(12).required(),
    code:Joi.string().length(4).required(),
  });

  ProfileCreate = Joi.object({
    adminName: Joi.string().trim().min(3).max(15).lowercase().required(),
    dateOfBirth: Joi.date(),
    emailAddress: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    gender:Joi.number(),
    locationLattitude:Joi.number(),
    locationLongitude:Joi.number(),
    districtOfCurrentLocationLattitude:Joi.number(),
    districtOfCurrentLocationLongitude:Joi.number(),
    districtOfPermanentLocationLattitude:Joi.number(),
    districtOfPermanenttLocationLongitude:Joi.number(),
    adminType:Joi.number()
});
}

export const adminValidator = new adminValidatorClass();
















