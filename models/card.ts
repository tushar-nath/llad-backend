// Make a card schema
import mongoose from 'mongoose'
import { ICard } from '../types'

const cardSchema = new mongoose.Schema<ICard>(
  {
    id: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    front: { type: Object, required: true },
    back: { type: Object, required: true },
    note: { type: String, required: false },
    tags: { type: [String], required: false },
    isStarred: { type: Boolean, default: false },
    interval: {
      type: Number,
      default: 0,
      required: true,
    },
    repetition: {
      type: Number,
      default: 0,
      required: true,
    },
    efactor: {
      type: Number,
      default: 2.5,
      required: true,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    createdAt: Date,
    updatedAt: Date,
    __v: { type: Number, select: false },
  },
  {
    timestamps: true,
  }
)

export const Card = mongoose.model<ICard>('Card', cardSchema)
