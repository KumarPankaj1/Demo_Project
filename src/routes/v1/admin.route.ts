import express from 'express';
import {imageUpload} from '../../middleware/multer.middleware';
import {Admin} from '../../controller/v1/admin.controller';
import {adminValidators} from '../../middleware/adminValidator.middleware';
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
             url: `http://localhost:${process.env.PORT}`,
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
router.route('/admin/Login').post(adminValidators.loginValidator,Admin.adminLogin);
router.route('/admin/profileCreate').put(adminValidators.ProfileCreateValidator,auth,Admin.adminProfileCreate);
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
 *          adminOtpgen:
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
 *          adminLogin:
 *              type: object
 *              properties:
 *                  phoneNumber: 
 *                      type: Number
 *                      example: 916397471669
 *                  code:
 *                    type: String
 *                    example: 1234
 *                    sescription: code must be in string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          adminProfileCreate:
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
 *                      example: 1
 *                      description:  SUPER_ADMIN-1,SUB_ADMIN-2
 */



/**
 * @swagger
 *  components:
 *      schemas:
 *          adminProfilePicUpload:
 *              type: object
 *              properties:
 *                  profile_pic:
 *                     type: file   
 *                     key: image         
 */


/**
 * @swagger
 * /admin/generateOtp:
 *        post:
 *           summary: used to generate otp from phonenumber
 *           tags: [OnboardingApi's For Admin]
 *           description: This api is used for otp generation
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schemas/adminOtpgen'               
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
 *                            $ref: '#components/schemas/adminLogin'               
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
 *                            $ref: '#components/schemas/adminProfileCreate'               
 *           responses:
 *                200:
 *                  description: admin profile created successfully
 */


/**
 * @swagger
 * /admin/profilePicUpload:
 *        put:
 *           summary: used to image upload
 *           tags: [OnboardingApi's For Admin]
 *           description: This api is used for user image upload
 *           requestBody:
 *               required: true
 *               content:
 *                   multipart/form-data:
 *                       schema:
 *                            $ref: '#components/schemas/adminProfilePicUpload'               
 *           responses:
 *                200:
 *                  description: admin image upload successfully
 */


export default router;


// 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
