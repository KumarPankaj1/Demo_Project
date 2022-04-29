import express from 'express';
import {upload} from '../../middleware/user.middleware';
import {User} from '../../controller/v1/user.controller';
import { userSignupValidator, userLoginValidator,userProfileCreateValidator} from '../../utils/validator';
import {auth,auth_Login} from '../../middleware/user.middleware';
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

router.route('/generateOtp').post(User.userGenerateOtp);
router.route('/user/Login').post(auth_Login,userLoginValidator,User.userLogin);
router.route('/user/profileCreate').put(auth,userProfileCreateValidator,User.userProfileCreate);
router.route('/user/profilePicUpload').put(upload.single('profile_pic'),auth,User.profilePicUpload);

/**
 * @swagger
 * tags:
 *   - name: OnboardingApi's
 *     description: Routes to login or create complete profile for a new user.
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          otpgen:
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
 *          login:
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
 *          profileCreate:
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
 *          profilePicUpload:
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
 *           tags: [OnboardingApi's]
 *           description: This api is used for otp generation
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schemas/otpgen'               
 *           responses:
 *                200:
 *                  description: otp generate successfully
 */



/**
 * @swagger
 * /user/Login:
 *        post:
 *           summary: used to login user
 *           tags: [OnboardingApi's]
 *           description: This api is used for login
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schemas/login'               
 *           responses:
 *                200:
 *                  description: login successfully
 */


/**
 * @swagger
 * /user/profileCreate:
 *        put:
 *           summary: used to verify otp and for creation user account
 *           tags: [OnboardingApi's]
 *           description: This api is used for user account creation
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schemas/profileCreate'               
 *           responses:
 *                200:
 *                  description: user profile created successfully
 */

/**
 * @swagger
 * /user/profilePicUpload:
 *        put:
 *           summary: used to image upload
 *           tags: [OnboardingApi's]
 *           description: This api is used for user image upload
 *           requestBody:
 *               required: true
 *               content:
 *                   multipart/form-data:
 *                       schema:
 *                            $ref: '#components/schemas/profilePicUpload'               
 *           responses:
 *                200:
 *                  description: user image upload successfully
 */


export default router;
