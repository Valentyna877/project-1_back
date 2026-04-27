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
      default: "https://res.cloudinary.com/dxfmtmmae/image/upload/v1777320467/leleka-app/avatars/avatar_69efb1926e4dff7d196cc57f.png",
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
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model("User", userSchema);
