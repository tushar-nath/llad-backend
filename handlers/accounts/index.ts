import { Request, Response } from 'express'
import { AccountService } from '../../services/account'
import { MailService } from '../../services/third-party/mail'

export class Accounts {
  static async signup(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body
      const user = await AccountService.signup(name, email, password)
      const {
        _doc: { password: _, createdAt, updatedAt, __v, ...userPayload },
      } = user as any
      await MailService.sendWelcomeMail({ recipient: email })
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

  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body
      await AccountService.forgotPassword(email)
      res.status(200).json({ message: 'Reset link sent to your email' })
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body

      // Verify the token in the database
      const user = await AccountService.verifyResetPasswordToken(token)

      // If the token is valid, update the user's password
      if (user) {
        await AccountService.updatePassword(user.email, newPassword)
        res.status(200).json({ message: 'Password reset successfully.' })
      } else {
        res.status(400).json({ error: 'Invalid or expired token.' })
      }
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async getTags(req: Request, res: Response) {
    try {
      const { userId } = req.params
      const tags = await AccountService.getTags(userId)
      res.status(200).json({ tags })
    } catch (error: any) {
      console.log('error is', error)
      res.status(400).json({ error: error.message })
    }
  }
}
