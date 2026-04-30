import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message("Invalid id format") : value;
};

export const emotionIdSchema = {
  [Segments.PARAMS]: Joi.object({
    emotionId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const diaryIdSchema = {
  [Segments.PARAMS]: Joi.object({
    diaryId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const taskIdSchema = {
  [Segments.PARAMS]: Joi.object({
    taskId: Joi.string().custom(objectIdValidator).required(),
  }),
};
