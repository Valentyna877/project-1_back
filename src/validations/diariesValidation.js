import { Joi, Segments } from "celebrate";

// GET
export const getAllDiariesSchema = {
  [Segments.QUERY]: Joi.object({}),
};

// CREATE
export const createDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64).required(),

    description: Joi.string().min(1).max(1000).required(),

    date: Joi.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .default(() => new Date().toISOString().split("T")[0]),

    emotions: Joi.array().items(Joi.string().required()),
  }),
};

// UPDATE
export const updateDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64),

    description: Joi.string().min(1).max(1000),

    date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),

    emotions: Joi.array().items(Joi.string().hex().length(24)).min(1).max(12),
  }).min(1),
};
