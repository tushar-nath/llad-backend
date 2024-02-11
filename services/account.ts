import { Account } from '../models/account'
import bcrypt from 'bcryptjs'
import clientPromise from '../lib/mongo'
import { IAccount } from '../types'
import { MailService } from './third-party/mail'

export class AccountService {
  static async signup(
    name: string,
    email: string,
    password: string
  ): Promise<IAccount> {
    try {
      await clientPromise
      const checkUser = await Account.find({ email: email })
      if (checkUser.length != 0) {
        throw new Error('User already exists')
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const userData = {
        name,
        email,
        password: hashedPassword,
      }
      const newUser = new Account(userData)
      const savedUser = await newUser.save()
      return savedUser
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }

  static async login(email: string, password: string): Promise<IAccount> {
    try {
      await clientPromise
      const checkUser: any = await Account.findOne({ email: email })
      if (checkUser === null) {
        throw new Error('User does not exist')
      }
      const match: any = bcrypt.compare(password, checkUser.password)
      if (match) {
        return checkUser
      } else {
        throw new Error('Incorrect password')
      }
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }

  static async updateNorwegianLevel(
    id: string,
    level: number
  ): Promise<IAccount | null> {
    try {
      await clientPromise
      const updatedUser = await Account.findByIdAndUpdate(
        id,
        { currentNorwegianSkill: level },
        { new: true }
      )
      return updatedUser
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }

  static async forgotPassword(email: string) {
    try {
      await clientPromise
      const token = Math.random().toString(36).substring(7)
      await MailService.sendMail({
        recipient: email,
        subject: 'Reset your password',
        url: `${process.env.CLIENT_URL}/reset-password/${token}`,
      })
      await Account.findOneAndUpdate(
        { email: email },
        { resetToken: token, resetExpire: Date.now() + 10 * 60 * 1000 } // 10 minutes
      )
      return
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }

  static async verifyResetPasswordToken(token: string) {
    try {
      await clientPromise
      const user = await Account.findOne({
        resetToken: token,
        resetExpire: { $gt: Date.now() },
      })
      if (!user) {
        throw new Error('Invalid or expired token')
      }
      return user
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }

  static async updatePassword(email: string, newPassword: string) {
    try {
      await clientPromise
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      await Account.findOneAndUpdate(
        { email: email },
        { password: hashedPassword, resetToken: null, resetExpire: null }
      )
      return
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }
}
