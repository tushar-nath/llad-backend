import { Schema, model } from 'mongoose'
import { IAccount, NorwegianSkillLevel } from '../types'

const accountSchema = new Schema<IAccount>(
  {
    id: Number,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, unique: true },
    accessToken: { type: String, required: false, unique: true },
    currentNorwegianSkill: {
      type: String,
      enum: Object.values(NorwegianSkillLevel),
    },
    createdAt: Date,
    updatedAt: Date,
    __v: { type: Number, select: false },
  },
  {
    timestamps: true,
  }
)

export const Account = model<IAccount>('Account', accountSchema)
