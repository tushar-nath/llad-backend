import { Schema, model } from 'mongoose'
import { IAccount, NorwegianSkillLevel } from '../types'

const accountSchema = new Schema<IAccount>(
  {
    id: Number,
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    currentNorwegianSkill: {
      type: String,
      enum: Object.values(NorwegianSkillLevel),
      default: NorwegianSkillLevel.Beginner,
    },
  },
  {
    timestamps: true,
  }
)

export const Account = model<IAccount>('Account', accountSchema)
