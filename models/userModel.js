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
    avatarURL: {
      type: String || null,
      default: null,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String || null,
      enum: ['Man', 'Woman'],
      default: null,
    },
    weight: {
      type: Number,
      default: 0,
    },
    activityTime: {
      type: Number,
      default: 0,
    },
    desiredVolume: {
      type: Number,
      min: 100,
      max: 5000,
      default: 1500,
    },
    accessToken: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
);

export const User = model('User', userShema);
