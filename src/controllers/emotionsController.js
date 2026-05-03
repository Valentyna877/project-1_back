import createHttpError from "http-errors";
import { Emotion } from "../models/emotion.js";

export const getAllEmotions = async (req, res) => {
  const emotions = await Emotion.find()
    .collation({ locale: "uk" })
    .sort({ title: 1 });
  if (!emotions) {
    throw createHttpError(500, "Something is wrong");
  }

  res.status(200).json(emotions);
};

export const getEmotionById = async (req, res) => {
  const { emotionId } = req.params;

  const emotion = await Emotion.findOne(emotionId);

  if (!emotion) {
    throw createHttpError(404, "Emotion not found");
  }

  res.status(200).json(emotion);
};
