import { Request, Response } from 'express'
import { CardService } from '../../services/card'

export class Cards {
  static async createCard(req: Request, res: Response) {
    try {
      const {
        userId,
        frontText,
        frontExample,
        backText,
        backExample,
        note,
        tags,
      } = req.body
      const card = await CardService.create(
        userId,
        frontText,
        frontExample,
        backText,
        backExample,
        note,
        tags
      )
      res.status(200).json({ card })
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async getCards(req: Request, res: Response) {
    try {
      console.log('its here')
      const { userId } = req.params
      console.log('userId', userId)
      const cards = await CardService.getCards(userId)
      res.status(200).json({ cards })
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async updateCard(req: Request, res: Response) {
    try {
      const {
        cardId,
        userId,
        frontText,
        frontExample,
        backText,
        backExample,
        note,
        tags,
        isStarred,
      } = req.body
      const card = await CardService.updateCard(
        cardId,
        userId,
        frontText,
        frontExample,
        backText,
        backExample,
        note,
        tags,
        isStarred
      )
      res.status(200).json({ card })
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async practiseCard(req: Request, res: Response) {
    try {
      const { cardId, userId, grade } = req.body
      const card = await CardService.practiseCard(cardId, userId, grade)
      res.status(200).json({ card })
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async starCard(req: Request, res: Response) {
    try {
      const { cardId, userId, isStarred } = req.body
      const card = await CardService.starCard(cardId, userId, isStarred)
      res.status(200).json({ card })
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async deleteCard(req: Request, res: Response) {
    try {
      const { cardId, userId } = req.body
      await CardService.deleteCard(cardId, userId)
      res.status(200).json({ message: 'Card deleted successfully' })
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }
}
