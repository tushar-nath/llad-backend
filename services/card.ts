import { supermemo } from 'supermemo'
import clientPromise from '../lib/mongo'
import { Card } from '../models/card'
import { ICard } from '../types'
import { SuperMemoGrade } from 'supermemo'
import dayjs from 'dayjs'

export class CardService {
  static async create(
    userId: number,
    frontText: string,
    frontExample: string,
    backText: string,
    backExample: string,
    note: string,
    tags: string[]
  ): Promise<ICard> {
    try {
      await clientPromise
      const cardData = {
        userId,
        front: { text: frontText, example: frontExample },
        back: { text: backText, example: backExample },
        note,
        tags,
      }
      const newCard = new Card(cardData)
      const savedCard = await newCard.save()
      return savedCard
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }

  static async getCards(userId: string): Promise<ICard[]> {
    try {
      await clientPromise
      const cards = await Card.find({ userId })
      return cards
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }

  static async updateCard(
    cardId: string,
    userId: string,
    frontText: string,
    frontExample: string,
    backText: string,
    backExample: string,
    note: string,
    tags: string[],
    isStarred: boolean
  ): Promise<ICard | null> {
    try {
      await clientPromise
      const card = await Card.findById(cardId)
      if (!card) {
        throw new Error('Card not found')
      }
      if (card.userId.toString() !== userId) {
        throw new Error('You are not authorized to update this card')
      }
      const updatedCard = await Card.findByIdAndUpdate(
        cardId,
        {
          front: { text: frontText, example: frontExample },
          back: { text: backText, example: backExample },
          note,
          tags,
          isStarred,
        },
        { new: true }
      )
      return updatedCard
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }

  static async practiseCard(cardId: string, userId: string, grade: number) {
    try {
      await clientPromise
      const card = await Card.findById(cardId)
      if (!card) {
        throw new Error('Card not found')
      }
      if (card.userId.toString() !== userId) {
        throw new Error('You are not authorized to update this card')
      }

      const { interval, repetition, efactor } = supermemo(
        card,
        grade as SuperMemoGrade
      )
      const dueDate = dayjs().add(interval, 'day').toDate()

      card.interval = interval
      card.repetition = repetition
      card.efactor = efactor
      card.dueDate = dueDate

      await card.save()
      return card
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }

  static async starCard(cardId: string, userId: string, isStarred: boolean) {
    try {
      await clientPromise
      const card = await Card.findById(cardId)
      if (!card) {
        throw new Error('Card not found')
      }
      if (card.userId.toString() !== userId) {
        throw new Error('You are not authorized to update this card')
      }
      card.isStarred = isStarred
      await card.save()
      return card
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }

  static async deleteCard(cardId: string, userId: string) {
    try {
      await clientPromise
      const card = await Card.findById(cardId)
      if (!card) {
        throw new Error('Card not found')
      }
      if (card.userId.toString() !== userId) {
        throw new Error('You are not authorized to delete this card')
      }
      await card.deleteOne()
      return
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }
}
