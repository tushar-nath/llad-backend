import { Request, Response } from 'express'
import { AccountService } from '../../services/account'

export class Accounts {
  static async signup(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body
      const user = await AccountService.signup(name, email, password)
      const {
        _doc: { password: _, createdAt, updatedAt, __v, ...userPayload },
      } = user as any
      res.status(200).json({ user: userPayload })
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await AccountService.login(email, password)
      const {
        _doc: { password: _, createdAt, updatedAt, __v, ...userPayload },
      } = user as any
      res.status(200).json({ user: userPayload })
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async updateNorwegeinLevel(req: Request, res: Response) {
    try {
      const { userId, currentNorwegianSkill } = req.body
      const user = await AccountService.updateNorwegianLevel(
        userId,
        currentNorwegianSkill
      )
      res.status(200).json({ user })
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }
}
