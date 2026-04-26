import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { createSession, setSessionCookies } from "../services/auth.js";
import { Session } from "../models/session.js";
import mongoose from "mongoose";

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

  await Session.deleteOne({ userId: user._id });

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
