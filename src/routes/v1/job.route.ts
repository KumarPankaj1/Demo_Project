import express from 'express';
import {Job} from '../../controller/v1/jobCtrl';
import auth from '../../middleware/auth.middleware';
import { adminMiddleware } from '../../middleware/admin.middleware';
import {imageUpload, videoUpload} from '../../middleware/multer.middleware';
import swaggerjsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userMiddleware } from '../../middleware/user.middleware';
import { checkSession } from "../../middleware/session.middleware";
import {options} from "../../utils/swagger"

const router = express.Router();
const openapiSpecification = swaggerjsDoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


router.route('/job/create').post(auth,adminMiddleware,imageUpload.single('profile_pic'),Job.jobUpload);
router.route('/get/jobs').get(auth,checkSession,Job.getJobs);
router.route('/filter/jobs').post(auth,checkSession,Job.filterJob);
router.route('/job/details/:jobid').get(auth,checkSession,Job.getDetails);
router.route('/job/apply/:jobid').get(auth,userMiddleware,checkSession,Job.jobApply);
router.route('/appliedjobs').get(auth,userMiddleware,checkSession,Job.getAppliedJOb);
router.route('/intrestedjobs').get(auth,userMiddleware,checkSession,Job.getIntrestedJobs);
router.route('/appliedjob/uploadexpvideo/:jobid').put(auth,userMiddleware,checkSession,videoUpload.single('video'),Job.uploadExperienceVideo);
router.route('/submit/jobfeedback/:jobid').post(auth,userMiddleware,checkSession,Job.submitJobFeedback);
router.route('/question/create/:jobid').post(auth,adminMiddleware,Job.UploadQuestion);
router.route('/get/questions/:jobid').get(auth,checkSession,Job.getQuestion);
router.route('/submit/answer/:jobid').post(auth,userMiddleware,checkSession,Job.submitAnswer);
router.route('/answercount/:jobid').get(auth,userMiddleware,checkSession,Job.answerCount);
router.route('/jobupdate').patch(auth,adminMiddleware,Job.jobUpdate);
router.route('/jobdelete').delete(auth,adminMiddleware,Job.deleteJob);

/**
 * @swagger
 * tags:
 *   - name: Job Module
 *     description: Routes related to job.
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          filterjobs:
 *              type: object
 *              properties:
 *                  jobName:
 *                      type: String
 *                      example: "Executive-BPO"
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          submitanswer:
 *              type: object
 *              properties:
 *                  questionId:
 *                      example: "62ab7687f6652e9c654d52fc"
 *                  userAnswer:
 *                      type: String
 *                      example: "All of the mentioned"
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          submitjobfeedback:
 *              type: object
 *              properties:
 *                  rating:
 *                      type: Number
 *                      example: 4
 *                  feedback:
 *                      type: String
 *                      example: "this job is helpful"
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          userJobExpVideoUpload:
 *              type: object
 *              properties:
 *                  video:
 *                     type: file
 *                     key: video
 */

/**
 * @swagger
 * /get/jobs:
 *        get:
 *           summary: used to fetch all jobs
 *           tags: [Job Module]
 *           description: This api is used for fetching all jobs
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *           responses:
 *                200:
 *                  description: all jobs has been fetched successfully
 */

/**
 * @swagger
 * /filter/jobs:
 *        post:
 *           summary: used to filter jobs
 *           tags: [Job Module]
 *           description: This api is used for filter jobs
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
 *                            $ref: '#components/schemas/filterjobs'
 *           responses:
 *                200:
 *                  description: job has been filtered successfully
 */



/**
 * @swagger
 * /job/details/{jobid}:
 *        get:
 *           summary: used to get details of a job
 *           tags: [Job Module]
 *           description: This api is used for getting  job details
 *           parameters:
 *               - in: path
 *                 name: jobid
 *                 description: jobid is required
 *                 schema:
 *                   type: string
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *           responses:
 *                200:
 *                  description: job details has been fatched successfully
 */

/**
 * @swagger
 * /job/apply/{jobid}:
 *        get:
 *           summary: used to apply for a job
 *           tags: [Job Module]
 *           description: This api is used for applying for a job
 *           parameters:
 *               - in: path
 *                 name: jobid
 *                 description: jobid is required
 *                 schema:
 *                   type: string
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *           responses:
 *                200:
 *                  description: job has been applied successfully
 */


/**
 * @swagger
 * /appliedjobs:
 *        get:
 *           summary: used to fetch all job which user has applied
 *           tags: [Job Module]
 *           description: This api is used for fetching all applied jobs
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *           responses:
 *                200:
 *                  description: all applied jobs has been fetched successfully
 */

/**
 * @swagger
 * /appliedjob/uploadexpvideo/{jobid}:
 *        put:
 *           summary: used to upload job related past experience video
 *           tags: [Job Module]
 *           description: This api is used for user job related past experience video upload
 *           parameters:
 *               - in: path
 *                 name: jobid
 *                 description: jobid is required
 *                 schema:
 *                   type: string
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
 *                            $ref: '#components/schemas/userJobExpVideoUpload'
 *           responses:
 *                200:
 *                  description: user experience upload successfully
 */

/**
 * @swagger
 * /get/questions/{jobid}:
 *        get:
 *           summary: used to fetch all questions related to a perticular job
 *           tags: [Job Module]
 *           description: This api is used for fetching all questions that belongs to a job
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *               - in: path
 *                 name: jobid
 *                 description: jobid is required
 *                 schema:
 *                   type: string
 *           responses:
 *                200:
 *                  description: all questions has been fetched successfully
 */

/**
 * @swagger
 * /submit/answer/{jobid}:
 *       post:
 *           summary: used to submit answer realted to a perticular question of a job
 *           tags: [Job Module]
 *           description: This api is used for submitting answer for a question
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *               - in: path
 *                 name: jobid
 *                 description: jobid is required
 *                 schema:
 *                   type: string
 *           requestBody:
 *               required: true
 *               content:
 *                    application/json:
 *                       schema:
 *                            $ref: '#components/schemas/submitanswer'
 *           responses:
 *                200:
 *                  description: answer has been submitted successfully
 */

/**
 * @swagger
 * /answercount/{jobid}:
 *        get:
 *           summary: used to find out count of answers given by user related to a perticular job
 *           tags: [Job Module]
 *           description: This api is used for counting all answers given by user that belongs to a job
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *               - in: path
 *                 name: jobid
 *                 description: jobid is required
 *                 schema:
 *                   type: string
 *           responses:
 *                200:
 *                  description: answer count  has been fetched successfully
 */

/**
 * @swagger
 * /submit/jobfeedback/{jobid}:
 *       post:
 *           summary: used to submit feedback realted to a perticular job
 *           tags: [Job Module]
 *           description: This api is used for submitting feedback for a job
 *           parameters:
 *               - in: header
 *                 name: deviceid
 *                 description: device-id is required
 *                 schema:
 *                   type: string
 *               - in: path
 *                 name: jobid
 *                 description: jobid is required
 *                 schema:
 *                   type: string
 *           requestBody:
 *               required: true
 *               content:
 *                    application/json:
 *                       schema:
 *                            $ref: '#components/schemas/submitjobfeedback'
 *           responses:
 *                200:
 *                  description: feedback has been submitted successfully
 */





export default router;