import crypto from "node:crypto";
import createHttpError from "http-errors";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { sendEmail } from "../utils/sendEmail.js";
import { User } from "../models/user.js";

export const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  res.status(200).json(user);
};

/// VERIFY EMAIL///
export const updateUser = async (req, res) => {
  const { gender, date, name, newEmail } = req.body;
  const userId = req.user._id;

  if (!newEmail) {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { gender, date, name },
      { returnDocument: "after" },
    );

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    return res.status(200).json(user);
  }

  const existingUser = await User.findOne({
    email: newEmail,
    _id: { $ne: userId },
  });

  if (existingUser) {
    throw createHttpError(409, "This email address is already in use.");
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      gender,
      date,
      name,
      newEmail,
      emailVerificationToken: verificationToken,
    },
    { returnDocument: "after" },
  );

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const verifyLink = `${process.env.BASE_URL}/api/users/verify-email/${verificationToken}`;

  try {
    await sendEmail({
      to: newEmail,
      subject: "Підтвердження електронної пошти",
      html: `
        <h3>Підтвердження електронної пошти</h3>
        <p>Будь ласка, перейдіть за посиланням:</p>
        <a href="${verifyLink}">${verifyLink}</a>
      `,
    });
  } catch (error) {
    console.error("Помилка відправки email:", error);
    throw createHttpError(500, "Failed to send email.");
  }

  return res.status(200).json({
    message: "Лист для підтвердження надіслано на нову електронну пошту",
  });
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({
    emailVerificationToken: token,
  });

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  user.email = user.newEmail;
  user.newEmail = null;
  user.emailVerificationToken = null;

  await user.save();

  res.status(200).json({
    message: "Електронну пошту успішно підтверджено",
  });
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
