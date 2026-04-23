import { ONE_WEEK } from "../constants/times.js";
import { BabyState } from "../models/babyState.js";
import { MomState } from "../models/momState.js";

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