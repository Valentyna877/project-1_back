import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "node:path";
import fs from "node:fs/promises";
import handlebars from "handlebars";
import { createSession, setSessionCookies } from "../services/auth.js";
import { Session } from "../models/session.js";
import mongoose from "mongoose";
import { sendEmail } from "../utils/sendEmail.js";
import { GENDERS_COLORS } from "../constants/genders.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) throw createHttpError(400, "Email in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword });
  const newSession = await createSession(newUser._id);
  await setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw createHttpError(401, "Invalid credentials");

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw createHttpError(401, "Invalid credentials");

  await Session.deleteMany({
    userId: user._id,
    refreshTokenValidUntil: { $lt: new Date() },
  });

  const session = await createSession(user._id);
  await setSessionCookies(res, session);

  res.status(200).json(user);
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId && mongoose.isValidObjectId(sessionId)) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie("sessionId");
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(204).send();
};

export const refreshUser = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  const session = await Session.findOne({ _id: sessionId });

  if (!session) throw createHttpError(401, "Session not found");

  const isSessionExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionExpired) throw createHttpError(401, "Session token expired");

  await Session.deleteOne({
    _id: sessionId,
    refreshToken,
  });

  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({ message: "Session refreshed" });
};

export const requestResetEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(200)
      .json({ message: "Password reset email sent successfully" });
  }

  const resetToken = jwt.sign(
    { sub: user._id, email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  const templatePath = path.resolve("templates/request-reset-email.html");
  const templateSource = await fs.readFile(templatePath, "utf-8");
  const template = handlebars.compile(templateSource);

  const color =
    user.gender === "boy"
      ? GENDERS_COLORS.BOY
      : user.gender === "girl"
        ? GENDERS_COLORS.GIRL
        : GENDERS_COLORS.UNKNOWN;

  const html = template({
    name: user.name,
    color,
    link: `${process.env.FRONTEND_DOMAIN}/auth/reset-data/?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Зміна даних для входу",
      html,
    });
  } catch {
    throw createHttpError(
      500,
      "Failed to send the email, please try again later.",
    );
  }

  res.status(200).json({ message: "Password reset email sent successfully" });
};

export const checkToken = async (req, res) => {
  const { token } = req.body;

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw createHttpError(401, "Invalid or expired token");
  }

  const { sub, email } = payload;

  const user = await User.findOne({ _id: sub, email });

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  res.status(200).json(user);
};

export const changeCreds = async (req, res) => {
  const { token, email, password } = req.body;

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw createHttpError(401, "Invalid or expired token");
  }

  const { sub, email: tokenEmail } = payload;

  let user = await User.findOne({ _id: sub, email: tokenEmail });

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(400, "Email in use");
  }

  if (email) {
    user = await User.findOneAndUpdate(
      { _id: sub, email: tokenEmail },
      { email },
      {
        returnDocument: "after",
      },
    );
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.findOneAndUpdate(
      { _id: sub, email: tokenEmail },
      { password: hashedPassword },
      {
        returnDocument: "after",
      },
    );
  }

  res.status(200).json(user);
};
