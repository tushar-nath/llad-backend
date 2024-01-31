import { Account } from '../models/account'
import bcrypt from 'bcryptjs'
import clientPromise from '../lib/mongo'
import { IAccount } from '../types'

export class AccountService {
  static async signup(
    name: string,
    email: string,
    password: string,
    currentNorwegianSkill: string
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
        currentNorwegianSkill,
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
      const checkUser = await Account.findOne({ email: email })
      if (checkUser === null) {
        throw new Error('User does not exist')
      }
      const match = await bcrypt.compare(password, checkUser.password)
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
}
