import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import express from 'express'
import { Account } from '../models/account'

// Middleware to check if the user is authenticated
export const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json({ message: 'Unauthorized' })
}

// Configure Google Strategy
export const configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      },
      async (
        accessToken: string,
        _refreshToken: string,
        profile: any,
        done: (error: any, user?: any, info?: any) => void
      ) => {
        try {
          const existingUser = await Account.findOne({
            email: profile?.emails[0]?.value,
          })

          if (existingUser && existingUser.currentNorwegianSkill) {
            // redirect to dashboard
            console.log('Existing user', existingUser)
            return done(null, existingUser)
          } else if (existingUser && !existingUser.currentNorwegianSkill) {
            // redirect to register
            console.log('Existing user', existingUser)
            return done(null, existingUser)
          }

          const newUser = new Account({
            email: profile?.emails[0].value,
            accessToken: accessToken,
            name: profile?.displayName,
          })

          await newUser.save()
          console.log('New user', newUser)
          return done(null, newUser)
          // redirect to the register
        } catch (err: any) {
          console.error(err)
          return done(err, false)
        }
      }
    )
  )

  // Serialize user into the session
  passport.serializeUser((user: any, done) => {
    done(null, user)
  })

  // Deserialize user from the session
  passport.deserializeUser((obj: any, done) => {
    done(null, obj)
  })
}

export default passport
