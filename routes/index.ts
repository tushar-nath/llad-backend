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

// Google OAuth callback
v1Router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (_req, res) => {
    res.redirect('/')
  }
)

v1Router.get('/profile', isAuthenticated, (req, res) => {
  res.json(req.user)
})
