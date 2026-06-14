import createHttpError from "http-errors";
import { BabyState } from "../models/babyState.js";
import { MomState } from "../models/momState.js";
import { calculatedDays, calculatedWeeks } from "../utils/calculateDates.js";

export const getPregnancyInfo = async (req, res) => {
  const { date } = req.user;

  const weeks = calculatedWeeks(date);
  const days = calculatedDays(date);

  const baby = await BabyState.findOne({
    weekNumber: weeks,
  });

  if (!baby) {
    throw createHttpError(400, "Not valid week number");
  }

  res.status(200).json({
    days,
    weeks,
    baby,
  });
};

export const getPregnancyInfoPublic = async (req, res) => {
  const date = new Date();
  date.setDate(date.getDate() + 40 * 7);

  const weeks = calculatedWeeks(date) + 1;
  const days = calculatedDays(date) - 1;

  const baby = await BabyState.findOne({ weekNumber: weeks });

  if (!baby) {
    throw createHttpError(400, "Not valid week number");
  }

  res.status(200).json({
    days,
    weeks,
    baby,
  });
};

export const getBabyState = async (req, res) => {
  const { week } = req.params;

  const baby = await BabyState.findOne({ weekNumber: week });
  if (!baby) {
    return res.status(404).json({ message: `No data for week ${week}` });
  }
  res.status(200).json(baby);
};

export const getMomState = async (req, res) => {
  const { week } = req.params;

  const mom = await MomState.findOne({ weekNumber: week });
  if (!mom) {
    return res.status(404).json({ message: `No data for week ${week}` });
  }
  res.status(200).json(mom);
};
