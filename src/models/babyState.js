import { Schema, model } from 'mongoose';

const BabyStatesSchema = new Schema(
  {
    analogy: { type: String, default: null },

    weekNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 42,
    },

    babySize: { type: Number, required: true, min: 0 },
    babyWeight: { type: Number, required: true, min: 0 },

    image: { type: String, required: true },
    imageAlt: { type: String, default: '' },

    babyActivity: { type: String, required: true, trim: true },
    babyDevelopment: { type: String, required: true, trim: true },
    interestingFact: [{ type: String, required: true, trim: true }],

    momDailyTips: {
      type: [{ type: String, trim: true }],
      default: [],
    },

    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const BabyState = model('BabyState', BabyStatesSchema, "babies");