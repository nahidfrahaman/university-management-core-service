import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterController } from './academicSemister.controller';
import { AcademicSemisterValidatoin } from './academicSemister.validation';

const router = express.Router();

router.get('/', AcademicSemisterController.getAllFromDb);
router.get('/:id', AcademicSemisterController.getSingleDataFromDb);
router.post(
  '/',
  validateRequest(AcademicSemisterValidatoin.create),
  AcademicSemisterController.insertIntoDb
);

export const AcademicRouter = router;
