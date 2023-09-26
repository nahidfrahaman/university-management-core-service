import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();

router.post('/', CourseController.insertIntoDb);
router.patch('/:id', CourseController.updateToDb);
router.post('/:id/assign', CourseController.assignFaculties);

export const CourseRoutes = router;
