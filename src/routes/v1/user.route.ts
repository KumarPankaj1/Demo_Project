import express , {Request, Response, Router} from 'express';
import cookieParser from 'cookie-parser';
import {upload} from '../../middleware/user.middleware';
import {User} from '../../entity/v1/user.entity';
import { userSignupValidator, userLoginValidator,userProfileCreateValidator} from '../../utils/validator';
import {auth,auth_Login} from '../../middleware/user.middleware';
import swaggerjsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();
const app = express();
app.use(express.json());
router.use(cookieParser());
// console.log(userProfileCreateValidator);





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

router.route('/user/generateOtp').post(User.userGenerateOtp);
router.route('/user/Signup').post(userSignupValidator,User.userSignup);
router.route('/user/Login').post(auth_Login,userLoginValidator,User.userLogin);
router.route('/user/profileCreate').patch(auth,userProfileCreateValidator,User.userProfileCreate);
router.route('/user/imageUpload').patch(upload.single('profile_pic'),auth,User.userImageUpload);

/**
 * @swagger
 *  components:
 *      schema:
 *          user:
 *              type: object
 *              properties:
 *                  Username:
 *                     type: String
 *                     example: pankaj
 *                  DateOfBirth:
 *                      type: Date
 *                      exapmle: 01/02/2000
 *                  Gender:
 *                      type: Number
 *                      example: 1
 *                  latt1:
 *                      type: Number
 *                      example: 12.27
 *                  long1:
 *                      type: Number
 *                      example: 12.37
 *                  latt2:
 *                      type: Number
 *                      example: 13.27
 *                  long2:
 *                      type: Number
 *                      example: 13.37
 *                  latt3:
 *                      type: Number
 *                      example: 14.27
 *                  long3:
 *                      type: Number
 *                      example: 14.37
 */

/**
 * @swagger
 *  components:
 *      schema:
 *          otpgen:
 *              type: object
 *              properties:
 *                  PhoneNumber: 
 *                      type: Number
 *                      example: 916397471669
 */

/**
 * @swagger
 *  components:
 *      schema:
 *          signup:
 *              type: object
 *              properties:
 *                  PhoneNumber: 
 *                      type: Number
 *                      example: 916397471669
 *                  code:
 *                    type: Number
 *                    example: 123456
 *                  UserType:
 *                      type: Number
 *                      example: 1
 */

/**
 * @swagger
 *  components:
 *      schema:
 *          login:
 *              type: object
 *              properties:
 *                  PhoneNumber: 
 *                      type: Number
 *                      example: 916397471669
 *                  code:
 *                    type: Number
 *                    example: 123456
 */

/**
 * @swagger
 *  components:
 *      schema:
 *          imageUpload:
 *              type: object
 *              properties:
 *                  profile_pic:
 *                     type: file   
 *                     key: image         
 */




/**
 * @swagger
 * /user/generateOtp:
 *        post:
 *           summary: used to generate otp from phonenumber
 *           description: This api is used for otp generation
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schema/otpgen'               
 *           responses:
 *                200:
 *                  description: otp generate successfully
 */


/**
 * @swagger
 * /user/Signup:
 *        post:
 *           summary: used to register user
 *           description: This api is used for registration
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schema/signup'               
 *           responses:
 *                200:
 *                  description: sign up successfully
 */

/**
 * @swagger
 * /user/Login:
 *        post:
 *           summary: used to login user
 *           description: This api is used for login
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schema/login'               
 *           responses:
 *                200:
 *                  description: login successfully
 */


/**
 * @swagger
 * /user/profileCreate:
 *        patch:
 *           summary: used to verify otp and for creation user account
 *           description: This api is used for user account creation
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schema/user'               
 *           responses:
 *                200:
 *                  description: user profile created successfully
 */

/**
 * @swagger
 * /user/imageUpload:
 *        patch:
 *           summary: used to image upload
 *           description: This api is used for user image upload
 *           requestBody:
 *               required: true
 *               content:
 *                   multipart/form-data:
 *                       schema:
 *                            $ref: '#components/schema/imageUpload'               
 *           responses:
 *                200:
 *                  description: user image upload successfully
 */


export default router;
