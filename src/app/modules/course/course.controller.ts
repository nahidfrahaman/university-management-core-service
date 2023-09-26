import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CourseService } from './course.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const results = await CourseService.insertIntoDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course created successfully',
    data: results,
  });
});
const assignFaculties = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body.faculties;
  console.log(data);
  const results = await CourseService.assignFaculties(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course created successfully',
    data: results,
  });
});

const updateToDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const results = await CourseService.updateToDb(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course updated successfully',
    data: results,
  });
});

export const CourseController = {
  insertIntoDb,
  updateToDb,
  assignFaculties,
};
