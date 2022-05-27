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
router.route('/jobs').get(auth,Job.getJobs);
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

export default router;