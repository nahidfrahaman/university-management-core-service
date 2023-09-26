import { Building, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BuildingSearchableFields } from './building.constant';
import { IBuildingFilterRequest } from './building.interface';

const insertIntoDB = async (data: Building): Promise<Building> => {
  const results = await prisma.building.create({
    data,
  });
  return results;
};

const getallintoDB = async (
  filters: IBuildingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Building[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: BuildingSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.BuildingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const results = await prisma.building.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.building.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: results,
  };
};

const getByIdFromDB = async (id: string): Promise<Building | null> => {
  const results = await prisma.building.findUnique({
    where: {
      id,
    },
  });
  return results;
};

const updatetodb = async (
  id: string,
  payload: Partial<Building>
): Promise<Building> => {
  const results = await prisma.building.update({
    where: {
      id,
    },
    data: payload,
  });
  return results;
};

const delettodb = async (id: string) => {
  const results = await prisma.building.delete({
    where: {
      id,
    },
  });
  return results;
};

export const BuildingService = {
  insertIntoDB,
  getallintoDB,
  getByIdFromDB,
  updatetodb,
  delettodb,
};
