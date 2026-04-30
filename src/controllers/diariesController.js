import createHttpError from "http-errors";
import { Diary } from "../models/diary.js";

export const getAllDiaries = async (req, res) => {
  const diaries = await Diary.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  if (!diaries) {
    throw createHttpError(404, "Diaries not found");
  }

  res.status(200).json(diaries);
};

export const createDiary = async (req, res) => {
  const diary = await Diary.create({ ...req.body, userId: req.user._id });

  res.status(201).json(diary);
};

export const getDiaryById = async (req, res) => {
  const { diaryId } = req.params;

  const diary = await Diary.findById(diaryId);

  if (!diary) {
    throw createHttpError(404, "Diary not found");
  }

  res.status(200).json(diary);
};

export const updateDiary = async (req, res) => {
  const { diaryId } = req.params;

  const diary = await Diary.findByIdAndUpdate(diaryId, req.body, { new: true });

  if (!diary) {
    throw createHttpError(404, "Diary not found");
  }

  res.status(200).json(diary);
};

export const deleteDiary = async (req, res) => {
  const { diaryId } = req.params;

  const diary = await Diary.findByIdAndDelete(diaryId);

  if (!diary) {
    throw createHttpError(404, "Diary not found");
  }

  res.status(200).json(diary);
};
