import { model, Schema } from "mongoose";
import { FORTY_WEEKS } from "../constants/times.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "http://google.com",
    },
    date: {
      type: Date,
      default: new Date(Date.now() + FORTY_WEEKS),
    },
    gender: {
      type: String,
      enum: ["boy", "girl", null],
      default: null,
    },
    newEmail: {
      type: String,
      default: null,
    },
    emailVerificationToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model("User", userSchema);
