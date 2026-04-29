import { Joi, Segments } from "celebrate";
import { FORTY_WEEKS } from "../constants/times.js";

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    gender: Joi.string()
      .valid("boy", "girl", "unknown")
      .allow(null)
      .default(null),
    date: Joi.date().default(() => new Date(Date.now() + FORTY_WEEKS)),
    name: Joi.string().min(2).max(30).optional(),
    newEmail: Joi.string().email().optional().messages({
      "string.email": "Некоректний формат електронної пошти",
    }),
  }),
};

export const updateUserGenderSchema = {
  [Segments.BODY]: Joi.object({
    gender: Joi.string().valid("boy", "girl", "unknown").allow(null).required(),
  }),
};