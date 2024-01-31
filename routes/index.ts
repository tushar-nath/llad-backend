import { Router } from 'express'
import passport, { isAuthenticated } from '../middleware/passport'
import { Accounts } from '../handlers/accounts'

export const v1Router = Router()

v1Router.get('/healthcheck', (_req, res) => {
  res.send({ success: true })
})

v1Router.post('/signup', Accounts.signup)
v1Router.post('/login', Accounts.login)
v1Router.post('/updateNorwegianLevel', Accounts.updateNorwegeinLevel)

// Initialize Google Authentication
v1Router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

v1Router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: any, res) => {
    if (req.user) {
      const userData = req.user
      // Convert user data to JSON string
      const userDataString = JSON.stringify(userData)
      // Encode the user data string
      const encodedData = encodeURIComponent(userDataString)

      if (req.user.currentNorwegianSkill) {
        return res.redirect(`${process.env.CLIENT_URL}/?user=${encodedData}`)
      } else {
        return res.redirect(
          `${process.env.CLIENT_URL}/register?user=${encodedData}`
        )
      }
    }
    res.redirect('/')
  }
)

v1Router.get('/profile', isAuthenticated, (req, res) => {
  res.json(req.user)
})
