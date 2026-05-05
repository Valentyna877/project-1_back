import { FORTY_WEEKS, ONE_DAY } from "../constants/times.js";

export const calculatedWeeks = (date) => {
  const today = new Date();
  const startDueDays = (today - (date - FORTY_WEEKS)) / ONE_DAY;
  const weeks = Math.floor(startDueDays / 7) + 1;
  return weeks;
};

export const calculatedDays = (date) => {
  const today = new Date();
  const dayToMeeting = date - today;
  const days = Math.ceil(dayToMeeting / ONE_DAY);
  return days;
};
