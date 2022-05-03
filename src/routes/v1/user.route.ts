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
             url: 'http://localhost:4000'
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

router.route('user/generateOtp').post(User.userGenerateOtp);
router.route('/user/Login').post(userValidators.loginValidator,User.userLogin);
router.route('/user/profileCreate').put(userValidators.ProfileCreateValidator,auth,User.userProfileCreate);
router.route('/user/profilePicUpload').put(imageUpload.single('profile_pic'),auth,User.profilePicUpload);
router.route('/userWorkexperienceDeatilsCreated').post(auth,User.userWorkExperienceDetails);
router.route('/user/videoUpload').put(videoUpload.single('video'),auth,User.userVideoUpload);

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
 *                    type: Number
 *                    example: 1234
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
 *                      example: "1"
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
 * /generateOtp:
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


export default router;


// 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
