import { Joi, Segments } from 'celebrate';

export const getAllTasksSchema = {
  [Segments.QUERY]: Joi.object({
    name: Joi.string().min(1).max(96),
    date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    isDone: Joi.boolean(),
  }),
};

export const taskDoneSchema = {
  [Segments.BODY]: Joi.object({
    isDone: Joi.boolean().required(),
  }),
};
