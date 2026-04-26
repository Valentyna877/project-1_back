import { ONE_DAY, ONE_WEEK, TOTAL_DAYS } from "../constants/times.js";
import { BabyState } from "../models/babyState.js";
import { MomState } from "../models/momState.js";

export const getPregnancyInfo = async (req, res) => {
  const { date } = req.user;

  const dueDay = date - Date.now();

  const days = Math.floor(dueDay / 1000 / 60 / 60 / 24);
  const weeks = Math.floor(days / 7);

  const { babyActivity, momDailyTips } = await BabyState.findOne({
    weekNumber: weeks,
  });

  res.status(200).json({ days, weeks, babyActivity, momDailyTips });
};

export const getPregnancyInfoPublic = async (req, res) => {
  const dueDay = new Date();
  dueDay.setDate(dueDay.getDate() + TOTAL_DAYS);

  const today = new Date();

  const dayToDelivery = dueDay - today;

  const days = Math.floor(dayToDelivery / ONE_DAY);
  const weeks = Math.floor(dayToDelivery / ONE_WEEK);

  const { babyActivity, momDailyTips } = await BabyState.findOne({
    weekNumber: weeks,
  });

  res.status(200).json({ days, weeks, babyActivity, momDailyTips });
};

export const getBabyState = async (req, res) => {
  const { date } = req.user;
  const today = new Date();
  const dueDate = new Date(date);
  const week = 40 - Math.ceil((dueDate - today) / ONE_WEEK);
  const baby = await BabyState.findOne({ weekNumber: week });
  if (!baby) {
    return res.status(404).json({ message: `No data for week ${week}` });
  }
  res.status(200).json(baby);
};

export const getMomState = async (req, res) => {
  const { date } = req.user;
  const today = new Date();
  const dueDate = new Date(date);
  const week = 40 - Math.ceil((dueDate - today) / ONE_WEEK);
  const mom = await MomState.findOne({ weekNumber: week });
  if (!mom) {
    return res.status(404).json({ message: `No data for week ${week}` });
  }
  res.status(200).json(mom);
};
