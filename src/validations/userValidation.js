import { Joi, Segments } from "celebrate";
import { FORTY_WEEKS } from "../constants/times";

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(32).required(),
    email: Joi.string().email().max(64).required(),
    gender: Joi.string().valid("boy", "girl").allow(null).default(null),
    date: Joi.date().default(() => new Date(Date.now() + FORTY_WEEKS)),
  }),
};
