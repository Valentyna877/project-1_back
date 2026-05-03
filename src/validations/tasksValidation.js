import { Joi, Segments } from "celebrate";

export const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).max(96).required(),
    date: Joi.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .required(),
    isDone: Joi.boolean().default(false),
  }),
};
export const getAllTasksSchema = {
  [Segments.QUERY]: Joi.object({
    name: Joi.string().min(1).max(96),
    date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    isDone: Joi.boolean(),
  }),
};

export const taskStatusSchema = {
  [Segments.BODY]: Joi.object({
    isDone: Joi.boolean().required(),
  }),
};

export const taskUpdateSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).max(96),
    date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    isDone: Joi.boolean(),
  }).min(1),
};
