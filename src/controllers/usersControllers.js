import createHttpError from "http-errors";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { User } from "../models/user.js";

export const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  const { name, email, gender, date } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { name, email, gender, date },
    { returnDocument: "after" },
  );

  if (!user) {
    throw createHttpError(404, "User not found");
  }
  res.status(200).json(user);
};

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, "No file");
  }
  const result = await saveFileToCloudinary(req.file.buffer, req.user._id);

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: result.secure_url },
    { returnDocument: "after" },
  );

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  res.status(200).json({ url: user.avatar });
};
