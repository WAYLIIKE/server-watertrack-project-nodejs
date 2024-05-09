import { Schema, model } from 'mongoose';

const waterSchema = Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      min: 0.1,
      max: 5000,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Water = model('Water', waterSchema);
