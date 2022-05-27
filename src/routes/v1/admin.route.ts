import express from 'express';
import {imageUpload} from '../../middleware/multer.middleware';
import {Admin} from '../../controller/v1/adminCtrl';
import {adminValidators} from '../../middleware/adminValidator.middleware';
import auth from '../../middleware/auth.middleware';
import { adminMiddleware } from '../../middleware/admin.middleware';
import swaggerjsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {checkSession} from "../../middleware/session.middleware";
import {options} from "../../utils/swagger"

const router = express.Router();
const openapiSpecification = swaggerjsDoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

router.route('/admin/generateOtp').post(Admin.adminGenerateOtp);
router.route('/admin/Login').post(Admin.adminLogin);
router.route('/admin/profileCreate').put(adminValidators.ProfileCreateValidator,auth,adminMiddleware,checkSession,Admin.adminProfileCreate);
router.route('/admin/profilePicUpload').put(auth,adminMiddleware,checkSession,Admin.profilePicUpload);
router.route('/admin/updatedetails').patch(auth,adminMiddleware,checkSession,Admin.updateAdminDetails);
router.route('/admin/logout').post(auth,adminMiddleware,checkSession,Admin.adminLogout);

/**
 * @swagger
 * tags:
 *   - name: Admin Onboarding Module
 *     description: Routes to login create update and get profile for a admin.
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
 *                  locLat:
 *                      type: Number
 *                      example: 12.27
 *                  locLong:
 *                      type: Number
 *                      example: 12.37
 *                  disOfCurLocLat:
 *                      type: Number
 *                      example: 13.27
 *                  disOfCurLocLong:
 *                      type: Number
 *                      example: 13.37
 *                  disOfPerLocLat:
 *                      type: Number
 *                      example: 14.27
 *                  disOfPerLocLong:
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
 *                  profileUrl:
 *                     type: String          
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          adminUpdateDetails:
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
 *                  locLat:
 *                      type: Number
 *                      example: 12.27
 *                  locLong:
 *                      type: Number
 *                      example: 12.37
 */


/**
 * @swagger
 * /admin/generateOtp:
 *        post:
 *           summary: used to generate otp from phonenumber
 *           tags: [Admin Onboarding Module]
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
 *           tags: [Admin Onboarding Module]
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
 *           tags: [Admin Onboarding Module]
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
 *           tags: [Admin Onboarding Module]
 *           description: This api is used for user image upload
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schemas/adminProfilePicUpload'               
 *           responses:
 *                200:
 *                  description: admin image upload successfully
 */


/**
 * @swagger
 * /admin/updatedetails:
 *        put:
 *           summary: used to update profile of admin
 *           tags: [Admin Onboarding Module]
 *           description: This api is used for admin profile update
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schemas/adminProfileCreate'               
 *           responses:
 *                200:
 *                  description: admin profile updated successfully
 */


/**
 * @swagger
 * /admin/logout:
 *        post:
 *           summary: used to logout admin 
 *           tags: [Admin Onboarding Module]
 *           description: This api is used for logout admin
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *           responses:
 *                200:
 *                  description: Admin has been logout successfully
 */


export default router;


// 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
