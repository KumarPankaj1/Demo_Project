import express from "express";
import { imageUpload, videoUpload } from "../../middleware/multer.middleware";
import { User } from "../../controller/v1/userCtrl";
import { userValidators } from "../../middleware/userValidator.middleware";
import auth from "../../middleware/auth.middleware";
import { userMiddleware } from "../../middleware/user.middleware";
import { checkSession } from "../../middleware/session.middleware";
import swaggerjsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
          url: `http://${process.env.HOST}:${process.env.PORT}`,
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
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

router.route("/user/generateOtp").post(User.userGenerateOtp);
router.route("/user/Login").post(userValidators.loginValidator, User.userLogin);
router
  .route("/user/profileCreate")
  .put(
    userValidators.ProfileCreateValidator,
    auth,
    userMiddleware,
    checkSession,
    User.userProfileCreate
  );
router
  .route("/user/profilePicUpload")
  .put(
    auth,
    userMiddleware,
    checkSession,
    imageUpload.single('profile_pic'),
    User.profilePicUpload
  );
router
  .route("/user/createWorkExperienceDetails")
  .post(
    userValidators.userWorkExperienceDetails,
    auth,
    userMiddleware,
    checkSession,
    User.userWorkExperienceDetails
  );
router
  .route("/user/experienceVideoUpload")
  .put(
    auth,
    userMiddleware,
    checkSession,
    videoUpload.single("video"),
    User.userExperienceVideoUpload
  );
router
  .route("/user/details")
  .get(auth, userMiddleware, checkSession, User.getUserDetails);
router
  .route("/user/updatedetails")
  .patch(auth, userMiddleware, checkSession, User.updateUserDetails);
router
  .route("/user/logout")
  .post(auth, userMiddleware, checkSession, User.userLogout);

/**
 * @swagger
 * tags:
 *   - name: User Onboarding Module
 *     description: Routes to login create update and get profile for a new user.
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
 *                  isPreWorkExp:
 *                      type: boolean
 *                      example: true
 *                  typeOfPreWorkExp:
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
 *                      type: [String]
 *                      example: ["Executive-BPO","Call-Center-Operator"]
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
 *  components:
 *      schemas:
 *          userUpdateDetails:
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
 *                  locLat:
 *                      type: Number
 *                      example: 12.27
 *                  locLong:
 *                      type: Number
 *                      example: 12.37
 */

/**
 * @swagger
 * /user/generateOtp:
 *        post:
 *           summary: used to generate otp from phonenumber
 *           tags: [User Onboarding Module]
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
 *           tags: [User Onboarding Module]
 *           description: This api is used for login
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
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
 *           tags: [User Onboarding Module]
 *           description: This api is used for user account creation
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
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
 *           tags: [User Onboarding Module]
 *           description: This api is used for user image upload
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *           requestBody:
 *               required: true
 *               content:
 *                    multipart/form-data:
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
 *           tags: [User Onboarding Module]
 *           description: This api is used for create user experience details
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
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
 *           tags: [User Onboarding Module]
 *           description: This api is used for user experience video upload
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *           requestBody:
 *               required: true
 *               content:
 *                    multipart/form-data:
 *                       schema:
 *                            $ref: '#components/schemas/userExperienceVideoUpload'
 *           responses:
 *                200:
 *                  description: user experience upload successfully
 */

/**
 * @swagger
 * /user/details:
 *        get:
 *           summary: used to get user details
 *           tags: [User Onboarding Module]
 *           description: This api is used for getting details of user
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *           responses:
 *                200:
 *                  description: user details has been fetched successfully
 */


/**
 * @swagger
 * /user/updatedetails:
 *        patch:
 *           summary: used to update user details
 *           tags: [User Onboarding Module]
 *           description: This api is used for update user profile
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *           requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                            $ref: '#components/schemas/userUpdateDetails'
 *           responses:
 *                200:
 *                  description: user profile updated successfully
 */


/**
 * @swagger
 * /user/logout:
 *        post:
 *           summary: used to logout user 
 *           tags: [User Onboarding Module]
 *           description: This api is used for logout user
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *           responses:
 *                200:
 *                  description: user has been logout successfully
 */

export default router;


