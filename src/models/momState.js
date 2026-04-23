import { Schema, model } from 'mongoose';

const MomStateSchema = new Schema(
  {
    weekNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 42,
    },

    feelings: {
      states: [{ type: String, trim: true }],
      sensationDescr: { type: String, trim: true, default: '' },
    },

    comfortTips: [
      {
        category: { type: String, trim: true, required: true },
        tip: { type: String, trim: true, required: true },
      },
    ],

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MomState = model('MomState', MomStateSchema, 'moms');