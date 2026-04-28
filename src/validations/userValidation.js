import { Joi, Segments } from "celebrate";
import { FORTY_WEEKS } from "../constants/times.js";
import { GENDERS } from "../constants/genders.js";

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    gender: Joi.string().valid(GENDERS).allow(null).default(null),
    date: Joi.date().default(() => new Date(Date.now() + FORTY_WEEKS)),
  }),
};

export const updateUserGenderSchema = {
  [Segments.BODY]: Joi.object({
    gender: Joi.string().valid(GENDERS).allow(null).required(),
  }),
};
