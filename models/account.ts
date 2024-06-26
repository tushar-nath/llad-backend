import { Schema, model } from 'mongoose'
import { IAccount, NorwegianSkillLevel } from '../types'

const accountSchema = new Schema<IAccount>(
  {
    id: Number,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, required: false, unique: true, sparse: true },
    password: { type: String, required: false, unique: true },
    accessToken: { type: String, required: false, unique: true, sparse: true },
    profilePicture: { type: String || Buffer, required: false },
    currentNorwegianSkill: {
      type: String,
      enum: Object.values(NorwegianSkillLevel),
    },
    about: { type: String, required: false },
    nativeLanguage: { type: String, required: false },
    phoneNumber: { type: Number, required: false },
    resetToken: { type: String, required: false },
    resetExpire: { type: Date, required: false },
    createdAt: Date,
    updatedAt: Date,
    __v: { type: Number, select: false },
  },
  {
    timestamps: true,
  }
)

export const Account = model<IAccount>('Account', accountSchema)
