import { ONE_DAY, ONE_WEEK } from "../constants/times.js";

export const calculatedWeeks = (date) => {
  const today = new Date();
  const startDueDays = (today - (date - 42 * ONE_WEEK)) / ONE_DAY;
  const weeks = Math.min(Math.floor(startDueDays / 7) + 1, 42);
  return weeks;
};

export const calculatedDays = (date) => {
  const today = new Date();
  const dayToMeeting = date - today;
  const days = Math.ceil(dayToMeeting / ONE_DAY);
  return days;
};
