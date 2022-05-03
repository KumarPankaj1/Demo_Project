import express from 'express';
import {imageUpload} from '../../middleware/multer.middleware';
import {Admin} from '../../controller/v1/admin.controller';
import {validators} from '../../middleware/validator.middleware';
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

router.route('/admin/generateOtp').post(Admin.adminGenerateOtp);
router.route('/admin/Login').post(validators.loginValidator,Admin.adminLogin);
router.route('/admin/profileCreate').put(validators.ProfileCreateValidator,auth,Admin.adminProfileCreate);
router.route('/admin/profilePicUpload').put(imageUpload.single('profile_pic'),auth,Admin.profilePicUpload);

/**
 * @swagger
 * tags:
 *   - name: OnboardingApi's For Admin
 *     description: Routes to login or create complete profile for a admin.
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
 *                  adminName:
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
 *                  adminType:
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
 * admin/generateOtp:
 *        post:
 *           summary: used to generate otp from phonenumber
 *           tags: [OnboardingApi's For Admin]
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
 * /admin/Login:
 *        post:
 *           summary: used to login admin
 *           tags: [OnboardingApi's For Admin]
 *           description: This api is used for admin
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
 * /admin/profileCreate:
 *        put:
 *           summary: used to verify otp and for creation admin account
 *           tags: [OnboardingApi's For Admin]
 *           description: This api is used for admin account creation
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schemas/profileCreate'               
 *           responses:
 *                200:
 *                  description: admin profile created successfully
 */

/**
 * @swagger
 * /user/profilePicUpload:
 *        put:
 *           summary: used to image upload
 *           tags: [OnboardingApi's For Admin]
 *           description: This api is used for admin image upload
 *           requestBody:
 *               required: true
 *               content:
 *                   multipart/form-data:
 *                       schema:
 *                            $ref: '#components/schemas/profilePicUpload'               
 *           responses:
 *                200:
 *                  description: admin image upload successfully
 */


export default router;


// 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