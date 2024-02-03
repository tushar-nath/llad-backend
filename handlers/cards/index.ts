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
}
