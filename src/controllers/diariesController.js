import createHttpError from "http-errors";
import { Diary } from "../models/Diary.js";

export const getAllDiaries = async (req, res) => {
  const diaries = await Diary.find().sort({ createdAt: -1 });
  res.json(diaries);
};

export const createDiary = async (req, res) => {
  const diary = await Diary.create({
    ...req.body,
    owner: req.user._id,
  });

  res.status(201).json(diary);
};

export const updateDiary = async (req, res) => {
  const { diaryId } = req.params;

  const diary = await Diary.findOneAndUpdate(
    { _id: diaryId, owner: req.user._id },
    req.body,
    { new: true },
  );

  if (!diary) {
    throw createHttpError(404, "Diary not found");
  }

  res.json(diary);
};

export const deleteDiary = async (req, res) => {
  const { diaryId } = req.params;

  const diary = await Diary.findOneAndDelete({
    _id: diaryId,
    owner: req.user._id,
  });

  if (!diary) {
    throw createHttpError(404, "Diary not found");
  }

  res.json({ message: "Diary deleted" });
};
