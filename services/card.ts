import clientPromise from '../lib/mongo'
import { Card } from '../models/card'
import { ICard } from '../types'

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
}
