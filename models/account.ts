import { Schema, model } from 'mongoose'
import { IAccount } from '../types'

const accountSchema = new Schema<IAccount>(
  {
    id: Number,
    username: String,
    email: { type: String, required: true, unique: true },
    password: String,
  },
  {
    timestamps: true,
  }
)

export const Account = model<IAccount>('Account', accountSchema)
