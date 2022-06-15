import express from 'express';
import {Job} from '../../controller/v1/jobCtrl';
import auth from '../../middleware/auth.middleware';
import { adminMiddleware } from '../../middleware/admin.middleware';
import {imageUpload, videoUpload} from '../../middleware/multer.middleware';
import swaggerjsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userMiddleware } from '../../middleware/user.middleware';
import {options} from "../../utils/swagger"

const router = express.Router();
const openapiSpecification = swaggerjsDoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


router.route('/job/create').post(auth,adminMiddleware,imageUpload.single('profile_pic'),Job.jobUpload);
router.route('/get/jobs').get(auth,Job.getJobs);
router.route('/filter/jobs').post(auth,Job.filterJob);
router.route('/job/details/:id').get(auth,Job.getDetails);
router.route('/job/apply/:id').get(auth,userMiddleware,Job.jobApply);
router.route('/appliedjobs').get(auth,userMiddleware,Job.getAppliedJOb);
router.route('/intrestedjobs').get(auth,userMiddleware,Job.getIntrestedJobs);
router.route('/appliedjob/uploadexperiencevideo/:id').put(auth,userMiddleware,videoUpload.single('video'),Job.uploadExperienceVideo);
router.route('/submitjobfeedback').patch(auth,userMiddleware,Job.submitJobFeedback);
router.route('/question/create').post(auth,adminMiddleware,Job.UploadQuestion);
router.route('/question').get(auth,Job.getQuestion);
router.route('/submit/answer').post(auth,userMiddleware,Job.submitAnswer);
router.route('/answercount').get(auth,userMiddleware,Job.answerCount);
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
 * /get/jobs:
 *        get:
 *           summary: used to fetch all details
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
 * /job/details/{id}:
 *        get:
 *           summary: used to get details of a job
 *           tags: [Job Module]
 *           description: This api is used for getting  job details
 *           parameters:
 *               - in: path
 *                 name: id
 *                 description: id is required
 *                 schema:
 *                   type: string
 *           responses:
 *                200:
 *                  description: job details has been fatched successfully
 */

/**
 * @swagger
 * /job/apply/{id}:
 *        get:
 *           summary: used to apply for a job
 *           tags: [Job Module]
 *           description: This api is used for applying for a job
 *           parameters:
 *               - in: path
 *                 name: id
 *                 description: id is required
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





export default router;