import { Schema, model } from "mongoose";

const diarySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 64,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
      trim: true,
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    emotions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Emotion",
        required: true,
      },
    ],
  },
  { timestamps: true },
);

diarySchema.path("emotions").validate(function (value) {
  return value.length >= 1 && value.length <= 12;
}, "Emotions must be between 1 and 12");

export const Diary = model("diary", diarySchema);
