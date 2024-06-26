import { Account } from '../models/account'
import bcrypt from 'bcryptjs'
import clientPromise from '../lib/mongo'
import { IAccount } from '../types'
import { MailService } from './third-party/mail'
import { Card } from '../models/card'

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
        throw new Error('Email not found, please create an account.')
      }
      const match: any = await bcrypt.compare(password, checkUser.password)
      if (match) {
        return checkUser
      } else {
        throw new Error('Incorrect password, please check and try again')
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
        url: `${process.env.CLIENT_URL}/reset-password?${token}`,
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
        throw new Error(
          'The password reset link has expired. Please use a new one.'
        )
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

  static async getTags(userId: string) {
    try {
      await clientPromise
      const cards = await Card.find({ userId: userId })
      const tags: string[] = []
      cards.forEach((card: any) => {
        card.tags.forEach((tag: any) => {
          if (!tags.includes(tag)) {
            tags.push(tag)
          }
        })
      })
      return tags
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }

  static async updateAccountDetails(
    userId: string,
    name: string,
    email: string,
    phoneNumber: number,
    about: string
  ) {
    try {
      await clientPromise
      const updatedUser = await Account.findByIdAndUpdate(
        userId,
        { name, email, phoneNumber, about },
        { new: true }
      )
      return updatedUser
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }

  static async updateProfilePicture(userId: string, profilePicture: any) {
    try {
      await clientPromise
      const updatedUser = await Account.findByIdAndUpdate(
        userId,
        { profilePicture: profilePicture },
        { new: true }
      )
      return updatedUser
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }
}
