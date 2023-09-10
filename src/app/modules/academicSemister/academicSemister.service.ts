/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicSemister, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicSemisterSearchableFields } from './academicSemister.constant';
import { IacademicSemisterFilterRequest } from './academicSemister.interface';

const insertIntoDb = async (
  data: AcademicSemister
): Promise<AcademicSemister> => {
  const results = await prisma.academicSemister.create({ data });
  return results;
};

const getAllFromDb = async (
  filters: IacademicSemisterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemister[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filtersData } = filters;
  const andConditions: Array<Prisma.AcademicSemisterWhereInput> = [];

  // jodi search korre
  if (searchTerm) {
    andConditions.push({
      OR: AcademicSemisterSearchableFields.map(fields => ({
        [fields]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // jodi filter kore
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.AcademicSemisterWhereInput = andConditions.length
    ? { AND: andConditions }
    : {};

  const results = await prisma.academicSemister.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });
  const total = await prisma.academicSemister.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: results,
  };
};

const getSingleDataFromDb = async (
  id: string
): Promise<AcademicSemister | null> => {
  const results = await prisma.academicSemister.findUnique({
    where: {
      id,
    },
  });
  return results;
};

export const AcademicSemisterService = {
  insertIntoDb,
  getAllFromDb,
  getSingleDataFromDb,
};
