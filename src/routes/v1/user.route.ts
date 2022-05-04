import express from 'express';
import {imageUpload,videoUpload} from '../../middleware/multer.middleware';
import {User} from '../../controller/v1/user.controller';
import {userValidators} from '../../middleware/userValidator.middleware';
import {auth} from '../../middleware/user.middleware';
import swaggerjsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Demo_Project',
        version: '1.0.0',
      },
      servers:[
          {
             url: `http://localhost:${process.env.port}`
          }
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "apiKey",
                name: "authorization",
                scheme: "bearer",
                in: "header",
            },
        },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    },
    apis: ['./src/routes/v1/*.ts'], // files containing annotations as above
  };

const openapiSpecification = swaggerjsDoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

router.route('/user/generateOtp').post(User.userGenerateOtp);
router.route('/user/Login').post(userValidators.loginValidator,User.userLogin);
router.route('/user/profileCreate').put(userValidators.ProfileCreateValidator,auth,User.userProfileCreate);
router.route('/user/profilePicUpload').put(imageUpload.single('profile_pic'),auth,User.profilePicUpload);
router.route('/user/createWorkExperienceDetails').post(userValidators.userWorkExperienceDetails,auth,User.userWorkExperienceDetails);
router.route('/user/experienceVideoUpload').put(auth,videoUpload.single('video'),User.userExperienceVideoUpload);

/**
 * @swagger
 * tags:
 *   - name: OnboardingApi's For User
 *     description: Routes to login or create complete profile for a new user.
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          userOtpgen:
 *              type: object
 *              properties:
 *                  phoneNumber: 
 *                      type: Number
 *                      example: 916397471669
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          userLogin:
 *              type: object
 *              properties:
 *                  phoneNumber: 
 *                      type: Number
 *                      example: 916397471669
 *                  code:
 *                    type: String
 *                    example: "1234"
 *                    description: code must be in string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          userProfileCreate:
 *              type: object
 *              properties:
 *                  username:
 *                     type: String
 *                     example: pankaj
 *                  dateOfBirth:
 *                      type: Date
 *                      exapmle: 01/02/2000
 *                  gender:
 *                      type: Number
 *                      example: 1
 *                  emailAddress:
 *                      type: String
 *                      example: "firstname.lastname@appinventiv.com"
 *                  locationLattitude:
 *                      type: Number
 *                      example: 12.27
 *                  locationLongitude:
 *                      type: Number
 *                      example: 12.37
 *                  districtOfCurrentLocationLattitude:
 *                      type: Number
 *                      example: 13.27
 *                  districtOfCurrentLocationLongitude:
 *                      type: Number
 *                      example: 13.37
 *                  districtOfPermanentLocationLattitude:
 *                      type: Number
 *                      example: 14.27
 *                  districtOfPermanenttLocationLongitude:
 *                      type: Number
 *                      example: 14.37
 *                  userType:
 *                      type: Number
 *                      example: 1
 *                      description: USER-1,CONTRACTOR-2,OTHER-3,
 */



/**
 * @swagger
 *  components:
 *      schemas:
 *          userProfilePicUpload:
 *              type: object
 *              properties:
 *                  profile_pic:
 *                     type: file   
 *                     key: image         
 */



/**
 * @swagger
 *  components:
 *      schemas:
 *          userCreateWorkExperienceDetails:
 *              type: object
 *              properties:
 *                  education:
 *                      type: Number
 *                      example: 1
 *                      description: GRADUATE-1, POSTGRADUATE-2, DIPLOMA-3
 *                  isPreviousWorkExperience:
 *                      type: boolean
 *                      example: true
 *                  typeOfPreviousWorkExperience:
 *                      type: Number
 *                      example: 1
 *                      description: CONSTRUCTION_LABOR-1,CALL_CENTER_OPERATOR-2,FOOD_DELIVERY-3,OTHER-4
 *                  previousSalary:
 *                      type: [Number]
 *                      example: [10000]
 *                  preferredLocation:
 *                      type: Number
 *                      example: 1
 *                      description: NOIDA-1,CHANDIGARH-2,LUCKNOW-3,UTTARAKHAND-4,
 *                  jobCategory:
 *                      type: Number
 *                      example: 3
 *                      description: CONSTRUCTION_LABOR-1, CALL_CENTER_OPERATOR-2, FOOD_DELIVERY-3, OTHER-4,
 *                  expectedSalary:
 *                      type: Number
 *                      example: 35000
 *                  workLookingFor:
 *                      type: Number
 *                      example: 2
 *                      description: CONSTRUCTION_LABOR-1,CALL_CENTER_OPERATOR-2,FOOD_DELIVERY-3,OTHER-4,
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          userExperienceVideoUpload:
 *              type: object
 *              properties:
 *                  video:
 *                     type: file   
 *                     key: video        
 */


/**
 * @swagger
 * /user/generateOtp:
 *        post:
 *           summary: used to generate otp from phonenumber
 *           tags: [OnboardingApi's For User]
 *           description: This api is used for otp generation
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schemas/userOtpgen'               
 *           responses:
 *                200:
 *                  description: otp generate successfully
 */



/**
 * @swagger
 * /user/Login:
 *        post:
 *           summary: used to login user
 *           tags: [OnboardingApi's For User]
 *           description: This api is used for login
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schemas/userLogin'               
 *           responses:
 *                200:
 *                  description: login successfully
 */


/**
 * @swagger
 * /user/profileCreate:
 *        put:
 *           summary: used to verify otp and for creation user account
 *           tags: [OnboardingApi's For User]
 *           description: This api is used for user account creation
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schemas/userProfileCreate'               
 *           responses:
 *                200:
 *                  description: user profile created successfully
 */

/**
 * @swagger
 * /user/profilePicUpload:
 *        put:
 *           summary: used to image upload
 *           tags: [OnboardingApi's For User]
 *           description: This api is used for user image upload
 *           requestBody:
 *               required: true
 *               content:
 *                   multipart/form-data:
 *                       schema:
 *                            $ref: '#components/schemas/userProfilePicUpload'               
 *           responses:
 *                200:
 *                  description: user image upload successfully
 */

/**
 * @swagger
 * /user/createWorkExperienceDetails:
 *        post:
 *           summary: used to add user past experience details
 *           tags: [OnboardingApi's For User]
 *           description: This api is used for create user experience details
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schemas/userCreateWorkExperienceDetails'               
 *           responses:
 *                200:
 *                  description: user experience details created successfully
 */

/**
 * @swagger
 * /user/experienceVideoUpload:
 *        put:
 *           summary: used to upload experience video
 *           tags: [OnboardingApi's For User]
 *           description: This api is used for user experience video upload
 *           requestBody:
 *               required: true
 *               content:
 *                   multipart/form-data:
 *                       schema:
 *                            $ref: '#components/schemas/userExperienceVideoUpload'               
 *           responses:
 *                200:
 *                  description: user experience upload successfully
 */


export default router;


// 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
