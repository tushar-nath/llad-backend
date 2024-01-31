import { Request, Response } from 'express'
import { AccountService } from '../../services/account'

export class Accounts {
  static async signup(req: Request, res: Response) {
    try {
      const { email, password, username } = req.body
      const user = await AccountService.signup(email, password, username)
      res.status(200).json({ user })
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }
}
