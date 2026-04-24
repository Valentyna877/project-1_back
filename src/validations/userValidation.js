import { Joi, Segments } from "celebrate";
import { FORTY_WEEKS } from "../constants/times.js";

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    gender: Joi.string().valid("boy", "girl").allow(null).default(null),
    date: Joi.date().default(() => new Date(Date.now() + FORTY_WEEKS)),
  }),
};

export const updateUserThemeSchema = {
  [Segments.BODY]: Joi.object({
    theme: Joi.string().valid("light", "dark").required(),
  }),
};
