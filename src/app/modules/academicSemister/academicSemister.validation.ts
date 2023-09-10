import { z } from 'zod';

const create = z.object({
  body: z.object({
    year: z.number({
      required_error: 'number is required',
    }),
    tittle: z.string({
      required_error: 'title is required',
    }),
    code: z.string({
      required_error: 'semister code is required',
    }),
    startMonth: z.string({
      required_error: 'startMonth is required',
    }),
    endMonth: z.string({
      required_error: 'endMonth is required',
    }),
  }),
});

export const AcademicSemisterValidatoin = {
  create,
};
