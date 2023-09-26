/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course, CourseFaculty } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utilts';
import {
  ICourseCreateData,
  IPrerequisiteCourseRequest,
} from './course.interface';

const insertIntoDb = async (
  data: ICourseCreateData
): Promise<Course | null> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async tx => {
    const results = await tx.course.create({
      data: courseData,
    });

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      await asyncForEach(
        preRequisiteCourses,
        async (preRequisiteCourse: IPrerequisiteCourseRequest) => {
          const createPrerequisite = await tx.courseToPrerequisite.create({
            data: {
              courseId: results.id,
              preRequisiteId: preRequisiteCourse.courseId,
            },
          });
        }
      );
    }

    return results;
  });

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            preRequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
};

const updateToDb = async (
  id: string,
  payload: ICourseCreateData
): Promise<Course | any> => {
  const { preRequisiteCourses, ...coursesData } = payload;

  await prisma.$transaction(async tx => {
    const results = await tx.course.update({
      where: {
        id,
      },
      data: coursesData,
    });

    if (!results) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'unable to create usre ');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePreRequisites = preRequisiteCourses.filter(
        (coursePreRequiste: any) =>
          coursePreRequiste.courseId && coursePreRequiste.isDeleted
      );

      const newPreRequiste = preRequisiteCourses.filter(
        coursePreRequiste =>
          coursePreRequiste.courseId && !coursePreRequiste.isDeleted
      );

      await asyncForEach(
        deletePreRequisites,
        async (deleteCourese: IPrerequisiteCourseRequest) => {
          await tx.courseToPrerequisite.deleteMany({
            where: {
              AND: [
                {
                  courseId: id,
                },
                {
                  preRequisiteId: deleteCourese.courseId,
                },
              ],
            },
          });
        }
      );

      await asyncForEach(
        newPreRequiste,
        async (newCourse: IPrerequisiteCourseRequest) => {
          await tx.courseToPrerequisite.create({
            data: {
              courseId: id,
              preRequisiteId: newCourse.courseId,
            },
          });
        }
      );
    }

    return results;
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id: id,
    },
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return responseData;
};

const assignFaculties = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[] | null> => {
  console.log('Course ID:', id);
  console.log('Payload:', payload);

  const facultyAssignments = payload.map(facultyId => ({
    courseId: id,
    facultyId: facultyId,
  }));

  console.log('Faculty Assignments:', facultyAssignments);

  const results = await prisma.courseFaculty.createMany({
    data: facultyAssignments,
  });

  if (!results) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Course assignment not successful'
    );
  }

  const assignFacultiesData = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },
    include: {
      faculty: true,
    },
  });

  return assignFacultiesData;
};

export const CourseService = {
  insertIntoDb,
  updateToDb,
  assignFaculties,
};
