import express from 'express';
import { AcademicRouter } from '../modules/academicSemister/academicSemister.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semisters/',
    routes: AcademicRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
