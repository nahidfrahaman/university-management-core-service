import express from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/acadmeicDepartment.route';

import { AcademicSemeterRoutes } from '../modules/academicSemister/academicSemester.route';

import { academicFacultyRoutes } from '../modules/acadmiFaculty/academicFaclutly.route';
import { BuildingRoutes } from '../modules/building/building.route';
import { CourseRoutes } from '../modules/course/course.routes';
import { roomRoutes } from '../modules/room/room.routes';
import { studentRoutes } from '../modules/student/student.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters/',
    routes: AcademicSemeterRoutes,
  },
  {
    path: '/academic-faculty',
    routes: academicFacultyRoutes,
  },
  {
    path: '/academic-department',
    routes: academicDepartmentRoutes,
  },
  {
    path: '/student',
    routes: studentRoutes,
  },
  {
    path: '/building',
    routes: BuildingRoutes,
  },
  {
    path: '/rooms',
    routes: roomRoutes,
  },
  {
    path: '/course',
    routes: CourseRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
