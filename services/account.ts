import { Account } from '../models/account'
import bcrypt from 'bcryptjs'
import clientPromise from '../lib/mongo'

export class AccountService {
  static async signup(email: string, password: string, username: string) {
    try {
      await clientPromise
      const checkUser = await Account.find({ email: email })
      if (checkUser.length != 0) {
        throw new Error('User already exists')
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const userData = {
        email,
        password: hashedPassword,
        username,
      }
      const newUser = new Account(userData)
      const savedUser = await newUser.save()
      return savedUser
    } catch (error: any) {
      console.error('Error: ', error)
      throw error
    }
  }
}
