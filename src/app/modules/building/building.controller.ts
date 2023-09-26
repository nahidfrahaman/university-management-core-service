import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BuildingFilterableeFields } from './building.constant';
import { BuildingService } from './building.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const results = await BuildingService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building created successfully',
    data: results,
  });
});

const getallintoDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BuildingFilterableeFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const results = await BuildingService.getallintoDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building created successfully',
    data: results,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const results = await BuildingService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building fetched successfully',
    data: results,
  });
});

const updatetodb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const results = await BuildingService.updatetodb(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building fetched successfully',
    data: results,
  });
});

const delettodb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const results = await BuildingService.delettodb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building fetched successfully',
    data: results,
  });
});

export const BuildingController = {
  insertIntoDB,
  getallintoDB,
  getByIdFromDB,
  updatetodb,
  delettodb,
};
