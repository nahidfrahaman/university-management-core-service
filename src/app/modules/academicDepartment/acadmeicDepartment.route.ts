import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './acadmeicDepartment.controller';
import { AcademicDepartmentValidation } from './acadmeicDepartment.validation';

const router = express.Router();

router.get('/', AcademicDepartmentController.getAllFromDB);
router.get('/:id', AcademicDepartmentController.getByIdFromDB);

router.post(
  '/',
  validateRequest(AcademicDepartmentValidation.create),
  AcademicDepartmentController.insertIntoDB
);

export const academicDepartmentRoutes = router;
