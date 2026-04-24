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
  const { gender, date } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { gender, date },
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

export const updateUserGender = async (req, res) => {
  const { gender } = req.body;
  const userId = req.user._id;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { gender },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw createHttpError(404, "User not found");
  }

  res.status(200).json({
    message: "Theme updated based on gender",
    updatedUser,
  });
};
