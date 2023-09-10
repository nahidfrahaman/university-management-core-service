import { AcademicSemister } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemisterFilterableFields } from './academicSemister.constant';
import { AcademicSemisterService } from './academicSemister.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const results = await AcademicSemisterService.insertIntoDb(req.body);
  sendResponse<AcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemister Created successfuly',
    data: results,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicSemisterFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const results = await AcademicSemisterService.getAllFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemister data is retrived successfuly',
    meta: results.meta,
    data: results.data,
  });
});

const getSingleDataFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const results = await AcademicSemisterService.getSingleDataFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemister data is retrived successfuly',

    data: results,
  });
});

export const AcademicSemisterController = {
  insertIntoDb,
  getAllFromDb,
  getSingleDataFromDb,
};
