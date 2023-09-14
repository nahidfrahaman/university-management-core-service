import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaclutly.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.get('/', AcademicFacultyController.getAllFromDB);
router.get('/:id', AcademicFacultyController.getByIdFromDB);

router.post(
  '/',
  validateRequest(AcademicFacultyValidation.create),
  AcademicFacultyController.insertIntoDB
);

export const academicFacultyRoutes = router;
