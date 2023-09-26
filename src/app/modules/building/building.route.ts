import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidation } from './building.validation';

const router = express.Router();
router.get('/:id', BuildingController.getByIdFromDB);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BuildingValidation.update),
  BuildingController.updatetodb
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BuildingController.delettodb
);
router.post(
  '/',

  validateRequest(BuildingValidation.create),
  BuildingController.insertIntoDB
);
router.get('/', BuildingController.getallintoDB);
export const BuildingRoutes = router;
