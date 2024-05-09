import { Schema, model } from 'mongoose';

const userShema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    avatarURL: String,
    name: String,
    gender: {
      type: String || null,
      default: null,
      enum: ['Man', 'Woman'],
    },
    weight: {
      type: Number,
      default: 0,
    },
    avtivityTime: {
      type: Number,
      default: 0,
    },
    desiredVolume: {
      type: Number,
      default: 1.5,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false },
);

export const User = model('User', userShema);
